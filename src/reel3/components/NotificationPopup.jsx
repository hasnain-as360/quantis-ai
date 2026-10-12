import { motion } from 'framer-motion'
import { TINTS3 } from '../tints'

const CORNER_STYLE = {
  'top-left': { top: 48, left: 48 },
  'top-right': { top: 48, right: 48 },
  'bottom-left': { bottom: 90, left: 48 },
  'bottom-right': { bottom: 90, right: 48 },
}
const CORNER_FROM = {
  'top-left': { x: -60, y: -20 },
  'top-right': { x: 60, y: -20 },
  'bottom-left': { x: -60, y: 20 },
  'bottom-right': { x: 60, y: 20 },
}

// One "problem" toast for Scene 2 — a concrete symptom sliding in from its
// own screen corner, matching the "interactive issues" brief without
// needing a real notification system.
export default function NotificationPopup({ def, show }) {
  const { icon: Icon, text, tint, from } = def
  const t = TINTS3[tint] ?? TINTS3.brand
  const origin = CORNER_FROM[from]

  return (
    <motion.div
      className="absolute flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
      style={CORNER_STYLE[from]}
      initial={{ opacity: 0, x: origin.x, y: origin.y, scale: 0.85 }}
      animate={
        show
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: origin.x * 0.4, y: origin.y * 0.4, scale: 0.9 }
      }
      transition={{ type: 'spring', stiffness: 210, damping: 20 }}
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${t.chip}`}>
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="text-[13px] font-semibold whitespace-nowrap text-ink">{text}</span>
    </motion.div>
  )
}
