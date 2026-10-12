import { motion } from 'framer-motion'
import { TINTS2, INSTAGRAM_GRADIENT } from '../tints'

// One channel row: icon chip + title/subtitle + an iOS-style switch, matching
// the reference recording's own toggle-row anatomy exactly.
export default function ToggleRow({ channel, on, index }) {
  const { label, sub, icon: Icon, tint } = channel
  const t = TINTS2[tint]

  return (
    <motion.div
      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${t ? t.chip : ''}`}
          style={tint === 'instagram' ? { background: INSTAGRAM_GRADIENT } : undefined}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-semibold text-ink">{label}</p>
          <p className="truncate text-[10.5px] text-ink-soft">{sub}</p>
        </div>
      </div>

      <motion.span
        className="relative h-5 w-9 shrink-0 rounded-full"
        initial={false}
        animate={{ backgroundColor: on ? '#2B91E5' : '#D8DDE5' }}
        transition={{ duration: 0.25 }}
      >
        <motion.span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
          initial={false}
          animate={{ x: on ? 18 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.span>
    </motion.div>
  )
}
