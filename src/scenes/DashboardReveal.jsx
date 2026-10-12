import { motion } from 'framer-motion'
import { METRICS } from '../data/metrics'
import MetricCard from '../components/MetricCard'
import CaptionSlot from '../components/CaptionSlot'

// Beat 'order': the header bar and the bento grid cascade in. Vertical-cut
// adaptation of the real (desktop, sidebar-driven) dashboard — a full desktop
// nav rail doesn't read at 9:16, so this keeps a slim workspace header and
// promotes the 6 metric cards into a 2-column grid, which is the layout a
// viewer actually expects from a mobile-shaped SaaS ad.
export default function DashboardReveal({ beatIndex, beat }) {
  const active = beatIndex >= 5

  return (
    <div className="absolute inset-0 z-10">
      <motion.div
        className="glass absolute inset-x-0 top-0 flex h-16 items-center justify-end rounded-none pr-4"
        initial={{ opacity: 0, y: -20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="glass rounded-full px-3 py-1 text-[11px] font-medium text-ink-soft">
          CyberSecure <span className="text-ink-soft/60">·</span> Admin
        </span>
      </motion.div>

      {/* bottom-36 (not bottom-6) deliberately leaves the caption its own
          clear band below the grid instead of fighting the bottom row for
          space — see Caption's `scrim` doc comment for the other half of
          this legibility fix. */}
      <div className="absolute inset-x-4 top-24 bottom-36 grid grid-cols-2 grid-rows-3 gap-3">
        {METRICS.map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i} active={active} />
        ))}
      </div>

      <CaptionSlot activeKey={beat?.id === 'order' ? 'order' : null} scrim>
        {beat?.caption}
      </CaptionSlot>
    </div>
  )
}
