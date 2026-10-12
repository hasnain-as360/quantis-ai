import { motion } from 'framer-motion'
import { Wand2, X, Star, Zap } from 'lucide-react'

// Matches the reference recording's "Generating Content" screen: the red
// Cancel pill and gold "Precision AI Agents" pill up top, a centered
// icon-in-a-ring, and a white progress card.
export default function GeneratingPanel({ progress }) {
  return (
    <motion.div
      key="generating"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-600">
          <X className="h-3 w-3" strokeWidth={3} /> Cancel Generation
        </span>
        <span className="flex items-center gap-1 rounded-full bg-gold-bg px-2.5 py-1 text-[10px] font-semibold text-gold">
          <Star className="h-3 w-3" fill="currentColor" /> Precision AI Agents
        </span>
      </div>

      <div className="flex flex-col items-center py-2 text-center">
        <motion.span
          className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand text-brand"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Wand2 className="h-5 w-5" strokeWidth={2} />
        </motion.span>
        <p className="text-[15px] font-bold text-ink">Generating Content</p>
        <p className="mt-1 text-[11px] text-ink-soft">Our AI agents are crafting your content with specialized models&hellip;</p>
      </div>

      <div className="mt-3 rounded-xl border border-slate-200/80 bg-white/85 p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between text-[11px] font-semibold text-ink">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-brand" strokeWidth={2} /> Overall Progress
          </span>
          <span className="text-brand tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>
      </div>

      <p className="mt-3 text-[10px] font-semibold tracking-wide text-ink-soft/80 uppercase">Content generation progress</p>
      <div className="mt-1.5 flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-2.5 py-2">
        <span className="text-[11px] font-medium text-ink">Email 1</span>
        <span className="text-[10px] font-medium text-ink-soft">{progress < 100 ? 'Pending' : 'Complete'}</span>
      </div>
    </motion.div>
  )
}
