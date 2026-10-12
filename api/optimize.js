const CITY_COORDINATES = {
  faisalabad: { lat: 31.418, lon: 73.079 },
  lahore: { lat: 31.520, lon: 74.358 },
  karachi: { lat: 24.860, lon: 67.001 },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const capacityKw = Number(body.capacityKw ?? body.capacity ?? 1000);
    const tariffPkr = Number(body.tariffPkr ?? body.tariff ?? 45);
    const washCostPkr = Number(body.washCostPkr ?? body.washCost ?? 15000);
    const daysSinceWash = Number(body.daysSinceWash ?? 14);
    const rawLocation = String(body.location ?? 'Faisalabad').toLowerCase();

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

    // Kimber Mathematical Engine
    const dailyDegradationRate = currentPm10 > 150 ? 0.0065 : 0.0035;
    const soilingLossPercent = Number((daysSinceWash * dailyDegradationRate * 100).toFixed(2));
    const cumulativeBleed = Math.round(
      capacityKw * 4.5 * (soilingLossPercent / 100) * tariffPkr * daysSinceWash
    );

    // Decision Logic & Response
    if (upcomingRain3Days > 5) {
      res.status(200).json({
        status: 'HOLD',
        directive: 'RAIN INCOMING',
        soilingLoss: soilingLossPercent,
        cumulativeBleed,
        waterSaved: 15000,
        rain_mm: upcomingRain3Days,
        pm10: currentPm10,
        dailyDegradationRate,
      });
      return;
    }

    if (cumulativeBleed > washCostPkr) {
      res.status(200).json({
        status: 'WASH',
        directive: 'ACTION REQUIRED',
        soilingLoss: soilingLossPercent,
        cumulativeBleed,
        waterSaved: 0,
        rain_mm: upcomingRain3Days,
        pm10: currentPm10,
        dailyDegradationRate,
      });
      return;
    }

    res.status(200).json({
      status: 'OPTIMAL',
      directive: 'HOLD POSITION',
      soilingLoss: soilingLossPercent,
      cumulativeBleed,
      waterSaved: 0,
      rain_mm: upcomingRain3Days,
      pm10: currentPm10,
      dailyDegradationRate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
