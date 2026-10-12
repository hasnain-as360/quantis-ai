import { motion } from 'framer-motion'
import { Mail, Music2, Camera, Share2 } from 'lucide-react'
import { TINTS3 } from '../tints'

// The right-hand mini-visualization for whichever feature is currently
// active in Scene 4's list — one small, legible demo per feature kind
// rather than a generic icon, so "breaking down each item with some
// interaction" means something concrete each time.
export default function FeatureDemo({ demo, tint }) {
  const t = TINTS3[tint] ?? TINTS3.brand

  if (demo === 'typing') {
    const lines = ['Personal Loans, A Clearer Picture', 'Compare rates side-by-side...']
    return (
      <div className="w-full max-w-xs space-y-2 rounded-xl border border-slate-200/80 bg-white/85 p-4">
        {lines.map((l, i) => (
          <motion.div
            key={l}
            className="overflow-hidden whitespace-nowrap text-[12px] font-medium text-ink"
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ duration: 0.9, delay: i * 0.5, ease: 'linear' }}
          >
            {l}
          </motion.div>
        ))}
      </div>
    )
  }

  if (demo === 'channels') {
    const icons = [Mail, Music2, Camera, Share2]
    return (
      <div className="flex gap-3">
        {icons.map((Icon, i) => (
          <motion.span
            key={i}
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${t.chip}`}
            initial={{ opacity: 0, y: 10, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 260, damping: 16 }}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </motion.span>
        ))}
      </div>
    )
  }

  if (demo === 'contacts') {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-white/85 px-5 py-4 text-center">
        <motion.p
          className="text-[28px] font-bold tabular-nums text-ink"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        >
          678,591
        </motion.p>
        <p className="mt-1 text-[11px] text-ink-soft">contacts across 2 lists · 100% subscribed</p>
      </div>
    )
  }

  // chart
  return (
    <div className="flex h-16 items-end gap-2 rounded-xl border border-slate-200/80 bg-white/85 px-4 py-3">
      {[40, 65, 30, 80, 55, 70].map((h, i) => (
        <motion.span
          key={i}
          className={`w-4 rounded-t ${t.chip}`}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
