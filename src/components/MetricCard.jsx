import { motion } from 'framer-motion';

export default function MetricCard({ icon: Icon, label, value, unit, trend, detail, accentColor = 'neon', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 1, 0.5, 1] }}
      className="bg-[#111111] border border-white/10 hover:border-white/20 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center group-hover:border-[#FFF313]/50 transition-colors">
              <Icon size={16} className="text-[#FFF313]" />
            </div>
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-[#888888]">
              {label}
            </span>
          </div>
          {trend && (
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">
              {trend}
            </span>
          )}
        </div>

        {/* Big Metric Display */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-mono text-[#888888] font-semibold">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Sub-detail */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#777777]">
        <span>{detail || 'Live Real-Time Index'}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFF313]/60 group-hover:bg-[#FFF313] transition-colors" />
      </div>
    </motion.div>
  );
}
