import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { WINDOWS } from '../data/windows'
import BrowserWindowCard from '../components/BrowserWindowCard'
import CaptionSlot from '../components/CaptionSlot'

const CAPTION_BEATS = new Set(['tabs', 'platforms', 'clarity', 'guessing'])

// Beats 0-3: the problem. Windows escalate in from nothing to full clutter
// across four staccato clauses, then (beat 'reveal') the whole field gets
// sucked into the center and vaporizes — the chaos -> order pivot.
export default function ChaosScene({ beatIndex, beat }) {
  const clearing = beatIndex >= 4 // 'reveal' or later
  const visibleWindows = WINDOWS.filter((w) => w.beat <= Math.min(beatIndex, 3))

  const isGuessing = beat?.id === 'guessing'
  const jitterAnimate = isGuessing
    ? { scale: [1, 1.12, 1.08], filter: ['blur(0px)', 'blur(7px)', 'blur(0px)'] }
    : { x: [0, -3, 2, -2, 0], y: [0, 2, -3, 1, 0] }
  const jitterTransition = isGuessing
    ? { duration: 0.6, ease: 'easeOut' }
    : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }

  return (
    <div className="absolute inset-0 z-20">
      <motion.div className="absolute inset-0" animate={jitterAnimate} transition={jitterTransition}>
        {visibleWindows.map((w) => (
          <BrowserWindowCard key={w.id} def={w} phase={clearing ? 'clearing' : 'chaos'} />
        ))}

        {isGuessing && (
          <motion.div
            className="absolute left-1/2 top-1/2 text-brand/70"
            style={{ marginLeft: -24, marginTop: -24 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0.6, 1], scale: 1 }}
            transition={{ duration: 1.1 }}
          >
            <HelpCircle className="h-12 w-12" strokeWidth={1.5} />
          </motion.div>
        )}
      </motion.div>

      <CaptionSlot activeKey={CAPTION_BEATS.has(beat?.id) ? beat.id : null} fast>
        {beat?.caption}
      </CaptionSlot>

      {/* hard-cut flash marking the exact instant chaos gives way to order */}
      <AnimatePresence>
        {beat?.id === 'reveal' && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-40 bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
