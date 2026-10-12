/**
 * Quantis AI — Kimber Optimization Engine
 *
 * Calls /api/optimize which feeds User Inputs & Environmental Data
 * to the Quantis AI Kimber Model LLM and returns the exact JSON decision matrix.
 */

export async function requestOptimization(inputs) {
  try {
    const payload = {
      capacity: Number(inputs.capacity) || 1000,
      tariff: Number(inputs.tariff) || 45,
      washCost: Number(inputs.washCost) || 15000,
      daysSinceWash: Number(inputs.daysSinceWash) || 14,
      location: inputs.location || 'Faisalabad',
      rain_mm: Number(inputs.rain_mm ?? 2.4),
      pm10_avg: Number(inputs.pm10_avg ?? 280),
    };

    const res = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();

    // Normalize status into lowercase for banner mapping
    const rawStatus = (data.status || 'OPTIMAL').toUpperCase();
    const statusMap = {
      WASH: 'wash',
      HOLD: 'hold',
      OPTIMAL: 'optimal',
    };
    const status = statusMap[rawStatus] || 'optimal';

    const soilingLoss = Number(data.current_soiling_loss_percent ?? 5.5).toFixed(1);
    const cumulativeBleed = Math.round(Number(data.cumulative_bleed_pkr ?? 18500)).toLocaleString('en-PK');
    const waterConserved = Math.round(Number(data.water_conserved_liters ?? 12000)).toLocaleString('en-PK');

    return {
      status,
      rawStatus,
      reasoning: data.reasoning || '',
      metrics: {
        soilingLoss: `${soilingLoss}%`,
        cumulativeBleed: `Rs. ${cumulativeBleed}`,
        waterConserved: `${waterConserved} L`,
      },
      rawMetrics: {
        soilingLoss: Number(soilingLoss),
        cumulativeBleed: Number(data.cumulative_bleed_pkr ?? 18500),
        waterConserved: Number(data.water_conserved_liters ?? 12000),
      },
      trends: {
        soilingLoss: `PM10: ${payload.pm10_avg} µg/m³`,
        cumulativeBleed: `Wash: Rs. ${payload.washCost.toLocaleString()}`,
        waterConserved: `Rain: ${payload.rain_mm} mm`,
      },
    };
  } catch (error) {
    console.warn('Fallback optimization calculation:', error);
    // Graceful mathematical fallback if network fails
    return fallbackCalculate(inputs);
  }
}

function fallbackCalculate(inputs) {
  const { capacity = 1000, tariff = 45, washCost = 15000, daysSinceWash = 14, rain_mm = 2.4 } = inputs;
  const soilingRate = 0.52;
  const soilingLoss = Math.min(soilingRate * daysSinceWash, 30);
  const avgYield = capacity * 4.5;
  let cumulativeBleed = 0;
  for (let d = 1; d <= daysSinceWash; d++) {
    cumulativeBleed += avgYield * tariff * (soilingRate * d / 100);
  }
  cumulativeBleed = Math.round(cumulativeBleed);
  const waterConserved = Math.round((capacity / 1000) * 2000 * Math.max(1, daysSinceWash / 7));

  let status = 'optimal';
  let reasoning = 'Cumulative bleed is currently below manual wash cost.';
  if (rain_mm > 5) {
    status = 'hold';
    reasoning = `Rain of ${rain_mm}mm forecasted in 72h. Natural wash incoming.`;
  } else if (cumulativeBleed > washCost) {
    status = 'wash';
    reasoning = `Cumulative bleed (Rs. ${cumulativeBleed.toLocaleString()}) exceeds wash cost (Rs. ${washCost.toLocaleString()}).`;
  }

  return {
    status,
    rawStatus: status.toUpperCase(),
    reasoning,
    metrics: {
      soilingLoss: `${soilingLoss.toFixed(1)}%`,
      cumulativeBleed: `Rs. ${cumulativeBleed.toLocaleString('en-PK')}`,
      waterConserved: `${waterConserved.toLocaleString('en-PK')} L`,
    },
    rawMetrics: {
      soilingLoss,
      cumulativeBleed,
      waterConserved,
    },
    trends: {
      soilingLoss: `↑ ${soilingRate}%/day`,
      cumulativeBleed: `Wash: Rs. ${washCost.toLocaleString()}`,
      waterConserved: `Rain: ${rain_mm} mm`,
    },
  };
}
