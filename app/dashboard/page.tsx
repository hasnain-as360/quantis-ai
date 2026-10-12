'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [inputs, setInputs] = useState({
    capacityKw: 1000,
    tariffPkr: 45,
    washCostPkr: 15000,
    daysSinceWash: 14,
    location: 'Faisalabad',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    status: 'WASH' | 'HOLD' | 'OPTIMAL';
    directive: string;
    soilingLoss: number;
    cumulativeBleed: number;
    waterSaved: number;
  }>({
    status: 'WASH',
    directive: 'ACTION REQUIRED',
    soilingLoss: 4.9,
    cumulativeBleed: 138915,
    waterSaved: 0,
  });

  const runOptimization = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch optimization data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runOptimization();
  }, [inputs.location]);

  // Badge Colors: Red for WASH, Blue for HOLD, Green for OPTIMAL
  const badgeStyle = {
    WASH: 'bg-red-500/20 text-red-400 border border-red-500/50',
    HOLD: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
    OPTIMAL: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
  }[data.status];

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#FFF313] uppercase tracking-widest block mb-1">
              Quantis AI // Backend Kimber Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {data.directive} · {data.status}
            </h1>
          </div>
          <div className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
            {data.directive}
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 font-mono text-xs">
            {error}
          </div>
        )}

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">Soiling Loss</span>
            <span className="text-3xl font-bold font-mono text-white tabular-nums">{data.soilingLoss}%</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">Cumulative Bleed</span>
            <span className="text-3xl font-bold font-mono text-[#FFF313] tabular-nums">Rs. {data.cumulativeBleed.toLocaleString()}</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">Water Conserved</span>
            <span className="text-3xl font-bold font-mono text-cyan-400 tabular-nums">{data.waterSaved.toLocaleString()} L</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-4">
          <button
            onClick={runOptimization}
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-[#FFF313] text-black font-extrabold font-mono text-xs uppercase tracking-wider hover:bg-[#E6DB11] transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Consulting Engine...' : 'Run Optimization Engine'}
          </button>
        </div>
      </div>
    </div>
  );
}
