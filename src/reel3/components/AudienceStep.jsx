import { motion } from 'framer-motion'
import { Search, Users } from 'lucide-react'

// Matches the reference recording's "Who's receiving this campaign?" step —
// a search field plus selectable contact-list rows.
export default function AudienceStep() {
  const lists = [
    { name: 'contacts sample (2)', count: 2 },
    { name: 'Warmup List', count: 677378, selected: true },
  ]

  return (
    <motion.div
      key="audience"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-200/80 bg-white/80 p-4"
    >
      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
        <Users className="h-4 w-4 text-brand" /> Who&rsquo;s receiving this campaign?
      </p>
      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-ink-soft" />
        <span className="text-[11px] text-ink-soft">Search lists or segments&hellip;</span>
      </div>

      <div className="mt-2.5 space-y-1.5">
        {lists.map((l) => (
          <motion.div
            key={l.name}
            className="flex items-center justify-between rounded-lg border px-3 py-2"
            animate={{ borderColor: l.selected ? '#2B91E5' : '#E2E6EB', backgroundColor: l.selected ? '#EAF4FD' : '#FFFFFF' }}
          >
            <span className="text-[11.5px] font-medium text-ink">{l.name}</span>
            <span className="text-[11px] font-semibold text-ink-soft tabular-nums">
              {l.count.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
