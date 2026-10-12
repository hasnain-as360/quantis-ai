import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function TelemetryChart({
  crossoverDay = 14,
  daysSinceWash = 14,
  soilingRate = 0.55,
  washCost = 15000,
  netRoi = 38400,
  isHold = false,
  status = 'WASH'
}) {
  const W = 700;
  const H = 240;
  const PAD = 35;

  // Dynamically calculate crossover X position on chart (30-day scale)
  const clampedCrossover = Math.max(3, Math.min(28, crossoverDay));
  const crossoverX = PAD + ((W - PAD * 2) / 30) * clampedCrossover;

  // Clamped current day X position
  const currentX = PAD + ((W - PAD * 2) / 30) * Math.min(30, daysSinceWash);

  // Dynamic degradation curve that curves down to crossover point and recovers
  const degradationPath = `M 35 60 C 140 70, 240 110, ${crossoverX} 165 L ${crossoverX + 2} 65 C ${crossoverX + 80} 75, 600 100, 665 130`;
  const areaPath = `M 35 60 C 140 70, 240 110, ${crossoverX} 165 L ${crossoverX + 2} 65 C ${crossoverX + 80} 75, 600 100, 665 130 L 665 210 L 35 210 Z`;

  const crossoverY = 165; // Wash Cost Threshold line

  return (
    <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={15} className="text-[#FFF313]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Algorithmic Telemetry
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-accent font-bold tracking-tight text-white">
            Yield Degradation vs. Recovery Curve
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-3 h-0.5 bg-[#FFF313]" />
            <span>Yield Degradation</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-3 h-0.5 border-t border-dashed border-[#EF4444]" />
            <span>Kimber Crossover (Day {clampedCrossover})</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Optimal Wash Recovery</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area with Subtle Grid Background */}
      <div className="relative w-full aspect-[2.6/1] grid-bg my-4 rounded-xl border border-white/5 p-2 overflow-hidden bg-[#0A0A0A]">
        {/* Ambient glow behind chart */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-[#FFF313]/5 rounded-full blur-[60px] pointer-events-none" />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF313" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFF313" stopOpacity="0.01" />
            </linearGradient>

            <filter id="neonLineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFF313" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[50, 90, 130, 170, 210].map((y, idx) => (
            <g key={y}>
              <line
                x1={PAD}
                y1={y}
                x2={W - PAD}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
              <text
                x={PAD - 8}
                y={y + 3}
                fill="#555555"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="end"
              >
                {100 - idx * 25}%
              </text>
            </g>
          ))}

          {/* Vertical Day lines */}
          {[1, 5, 10, 15, 20, 25, 30].map((day) => {
            const x = PAD + ((W - PAD * 2) / 30) * day;
            return (
              <g key={day}>
                <line
                  x1={x}
                  y1={40}
                  x2={x}
                  y2={210}
                  stroke="rgba(255,255,255,0.04)"
                />
                <text
                  x={x}
                  y={225}
                  fill="#666666"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  D{day}
                </text>
              </g>
            );
          })}

          {/* Kimber Threshold Horizontal Line */}
          <line
            x1={PAD}
            y1={crossoverY}
            x2={W - PAD}
            y2={crossoverY}
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text
            x={W - PAD - 8}
            y={crossoverY - 6}
            fill="#EF4444"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="end"
          >
            KIMBER THRESHOLD (WASH COST: RS. {washCost.toLocaleString()})
          </text>

          {/* Gradient area under degradation curve */}
          <path
            d={areaPath}
            fill="url(#neonGradient)"
          />

          {/* Main Neon Yield Curve */}
          <motion.path
            key={degradationPath}
            d={degradationPath}
            fill="none"
            stroke="#FFF313"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonLineGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Current Day indicator */}
          <line
            x1={currentX}
            y1={40}
            x2={currentX}
            y2={210}
            stroke="#FFF313"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <text
            x={currentX}
            y={35}
            fill="#FFF313"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            TODAY (D{daysSinceWash})
          </text>

          {/* Crossover event vertical line */}
          <line
            x1={crossoverX}
            y1={40}
            x2={crossoverX}
            y2={210}
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx={crossoverX} cy={crossoverY} r="4.5" fill="#06B6D4" stroke="#000" strokeWidth="2" />
          <circle cx={crossoverX + 2} cy={65} r="4.5" fill="#22C55E" stroke="#000" strokeWidth="2" />

          {/* Annotation flags */}
          <g transform={`translate(${Math.min(W - 130, crossoverX + 6)}, 75)`}>
            <rect width="118" height="24" rx="4" fill="#111111" stroke="rgba(255,255,255,0.2)" />
            <text x="6" y="16" fill="#22C55E" fontSize="9" fontFamily="monospace" fontWeight="bold">
              +YIELD RECOVERY
            </text>
          </g>

          <g transform={`translate(${Math.max(PAD, crossoverX - 125)}, ${crossoverY + 12})`}>
            <rect width="120" height="20" rx="4" fill="#111111" stroke="#EF4444" />
            <text x="6" y="14" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">
              CROSSOVER DAY {clampedCrossover}
            </text>
          </g>
        </svg>
      </div>

      {/* Footer Metrics Row */}
      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Soiling Rate</span>
            <span className="font-bold text-white tabular">{soilingRate}% / day</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Crossover Day</span>
            <span className="font-bold text-[#FFF313] tabular">Day {clampedCrossover}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Estimated Wash Net ROI</span>
            <span className="font-bold text-emerald-400 tabular">+Rs. {Math.max(0, netRoi).toLocaleString()}</span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="hidden md:block">
            <span className="text-zinc-500 block text-[10px] uppercase">Precipitation Status</span>
            <span className={`font-bold ${isHold ? 'text-cyan-400' : 'text-zinc-400'}`}>
              {isHold ? 'Rain Override Active' : 'Clear Sky Window'}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-zinc-500">
          Kimber Mathematical Model Synced
        </div>
      </div>
    </div>
  );
}
