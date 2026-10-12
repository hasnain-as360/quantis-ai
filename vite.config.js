import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const CITY_COORDINATES = {
  faisalabad: { lat: 31.418, lon: 73.079 },
  lahore: { lat: 31.520, lon: 74.358 },
  karachi: { lat: 24.860, lon: 67.001 },
};

function optimizeApiPlugin() {
  return {
    name: 'optimize-api-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/optimize', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsedBody = body ? JSON.parse(body) : {};

            const capacityKw = Number(parsedBody.capacityKw ?? parsedBody.capacity ?? 1000);
            const tariffPkr = Number(parsedBody.tariffPkr ?? parsedBody.tariff ?? 45);
            const washCostPkr = Number(parsedBody.washCostPkr ?? parsedBody.washCost ?? 15000);
            const daysSinceWash = Number(parsedBody.daysSinceWash ?? 14);
            const rawLocation = String(parsedBody.location ?? 'Faisalabad').toLowerCase();

            // Coordinate Mapping
            let cityKey = 'faisalabad';
            if (rawLocation.includes('lahore')) cityKey = 'lahore';
            else if (rawLocation.includes('karachi')) cityKey = 'karachi';

            const coords = CITY_COORDINATES[cityKey] || CITY_COORDINATES.faisalabad;

            // Parallel Fetches from Open-Meteo
            const rainUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=precipitation_sum&timezone=auto`;
            const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coords.lat}&longitude=${coords.lon}&hourly=pm10`;

            const [rainRes, aqiRes] = await Promise.all([
              fetch(rainUrl).then((r) => (r.ok ? r.json() : null)).catch(() => null),
              fetch(aqiUrl).then((r) => (r.ok ? r.json() : null)).catch(() => null),
            ]);

            // Calculate upcoming 3 days rain sum
            let upcomingRain3Days = 0;
            if (rainRes?.daily?.precipitation_sum) {
              const next3Days = rainRes.daily.precipitation_sum.slice(0, 3);
              upcomingRain3Days = Number(
                next3Days.reduce((acc, val) => acc + (Number(val) || 0), 0).toFixed(1)
              );
            }

            // Calculate current PM10
            let currentPm10 = 160;
            if (aqiRes?.hourly?.pm10 && Array.isArray(aqiRes.hourly.pm10)) {
              const validPm10 = aqiRes.hourly.pm10.filter((v) => typeof v === 'number');
              if (validPm10.length > 0) {
                currentPm10 = Math.round(validPm10[0] ?? validPm10.slice(0, 24).reduce((a, b) => a + b, 0) / 24);
              }
            }

            // The Kimber Mathematical Engine
            const dailyDegradationRate = currentPm10 > 150 ? 0.0065 : 0.0035;
            const soilingLossPercent = Number((daysSinceWash * dailyDegradationRate * 100).toFixed(2));
            const cumulativeBleed = Math.round(
              capacityKw * 4.5 * (soilingLossPercent / 100) * tariffPkr * daysSinceWash
            );

            // Decision Logic & Response
            let responsePayload;
            if (upcomingRain3Days > 5) {
              responsePayload = {
                status: 'HOLD',
                directive: 'RAIN INCOMING',
                soilingLoss: soilingLossPercent,
                cumulativeBleed,
                waterSaved: 15000,
                rain_mm: upcomingRain3Days,
                pm10: currentPm10,
                dailyDegradationRate,
              };
            } else if (cumulativeBleed > washCostPkr) {
              responsePayload = {
                status: 'WASH',
                directive: 'ACTION REQUIRED',
                soilingLoss: soilingLossPercent,
                cumulativeBleed,
                waterSaved: 0,
                rain_mm: upcomingRain3Days,
                pm10: currentPm10,
                dailyDegradationRate,
              };
            } else {
              responsePayload = {
                status: 'OPTIMAL',
                directive: 'HOLD POSITION',
                soilingLoss: soilingLossPercent,
                cumulativeBleed,
                waterSaved: 0,
                rain_mm: upcomingRain3Days,
                pm10: currentPm10,
                dailyDegradationRate,
              };
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(responsePayload));
          } catch (err) {
            console.error('API /api/optimize error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal error' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), optimizeApiPlugin()],
});
