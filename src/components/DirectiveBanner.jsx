import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CloudRain, AlertTriangle } from 'lucide-react';

const STATE_CONFIG = {
  optimal: {
    icon: ShieldCheck,
    label: 'OPTIMAL',
    statusTag: 'HOLD POSITION',
    title: 'STATUS: OPTIMAL · HOLD POSITION',
    defaultDesc: 'Soiling degradation has not crossed the Kimber crossover threshold. Manual wash costs currently exceed cumulative revenue loss. System operating profitably.',
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
    dot: 'bg-emerald-500',
    action: 'Hold wash position. Cleaning currently yields negative ROI.'
  },
  hold: {
    icon: CloudRain,
    label: 'HOLD',
    statusTag: 'RAIN INCOMING',
    title: 'ACTION: HOLD · RAIN INCOMING',
    defaultDesc: 'Atmospheric telemetry confirms upcoming 3-day precipitation exceeds 5mm. Natural rain wash will reset soiling loss to 0%, conserving 15,000L of RO water.',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    badgeClass: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
    dot: 'bg-blue-500',
    action: 'Hold maintenance crew. Natural rain wash incoming.'
  },
  wash: {
    icon: AlertTriangle,
    label: 'WASH',
    statusTag: 'ACTION REQUIRED',
    title: 'ACTION REQUIRED: WASH TODAY',
    defaultDesc: 'Kimber crossover threshold has been breached and rain forecast is under 5mm. Cumulative revenue bleed exceeds cleaning expenditure. Immediate wash will generate positive cash ROI.',
    border: 'border-red-500/60',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    badgeClass: 'bg-red-500/20 text-red-400 border border-red-500/50',
    dot: 'bg-red-500',
    action: 'Dispatch cleaning crew immediately. High ROI recovery window active.'
  },
};

export default function DirectiveBanner({ status = 'optimal', reasoning }) {
  const rawLower = (status || '').toLowerCase();
  let normalizedKey = 'optimal';
  if (rawLower.includes('rain') || rawLower.includes('hold')) {
    normalizedKey = 'hold';
  } else if (rawLower.includes('wash')) {
    normalizedKey = 'wash';
  } else {
    normalizedKey = 'optimal';
  }

  const config = STATE_CONFIG[normalizedKey] || STATE_CONFIG.optimal;
  const Icon = config.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={normalizedKey + (reasoning || '')}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`bg-[#111111] border ${config.border} rounded-2xl p-6 relative overflow-hidden shadow-2xl`}
      >
        {/* Subtle radial ambient highlight */}
        <div className={`absolute top-0 right-0 w-80 h-80 ${config.bg} rounded-full blur-[90px] pointer-events-none`} />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${config.dot} animate-pulse`} />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#AAAAAA]">
                AI DIRECTIVE TELEMETRY
              </span>
            </div>

            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${config.badgeClass}`}>
              <Icon size={14} />
              <span>{config.statusTag}</span>
            </div>
          </div>

          {/* Main Title */}
          <div>
            <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${config.text} leading-tight mb-2`}>
              {config.title}
            </h3>
            <p className="text-sm text-[#CCCCCC] leading-relaxed max-w-4xl">
              {reasoning || config.defaultDesc}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-[#888888]">Recommendation:</span>
              <span className="font-semibold text-white">{config.action}</span>
            </div>
            <span className="text-[11px] text-[#777777]">
              Quantis Kimber LLM Verified
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
