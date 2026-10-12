import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { STEPS } from '../beats'

// All 8 nodes stay on screen (matching the reference exactly) but per-node
// text labels don't survive being shrunk to an 8-across row on a 480px-wide
// canvas — "Channels"/"Schedule"/"Audience" turn to mush at that size. One
// prominent "Step n · Label" line beneath the row carries the same
// information legibly instead of a strict per-node reproduction.
//
// When `activeIndex` jumps by more than one step (the brief's "the UI
// automatically interacts with itself"), this chases through each
// intermediate step quickly rather than teleporting — reads as the wizard
// racing ahead on its own, not a hard cut.
export default function Stepper({ activeIndex, revealed }) {
  const [display, setDisplay] = useState(activeIndex)
  const prevTarget = useRef(activeIndex)

  useEffect(() => {
    if (activeIndex === prevTarget.current) return
    prevTarget.current = activeIndex
    const from = display
    const to = activeIndex
    const dir = to > from ? 1 : -1
    let cur = from
    const timers = []
    while (cur !== to) {
      cur += dir
      const step = cur
      timers.push(setTimeout(() => setDisplay(step), Math.abs(step - from) * 90))
    }
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <div>
      <div className="flex items-center px-1">
        {STEPS.map((label, i) => {
          const state = i < display ? 'done' : i === display ? 'active' : 'upcoming'
          return (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <motion.div
                className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                initial={false}
                animate={{
                  opacity: revealed ? 1 : 0,
                  scale: revealed ? 1 : 0.4,
                  backgroundColor: state === 'done' ? '#2B91E5' : '#FFFFFF',
                  borderColor: state === 'upcoming' ? '#D8DDE5' : '#2B91E5',
                  color: state === 'active' ? '#2B91E5' : state === 'upcoming' ? '#9AA4B2' : '#FFFFFF',
                }}
                transition={{
                  opacity: { duration: 0.3, delay: revealed ? i * 0.06 : 0 },
                  scale: { duration: 0.3, delay: revealed ? i * 0.06 : 0 },
                  backgroundColor: { duration: 0.22 },
                  borderColor: { duration: 0.22 },
                  color: { duration: 0.22 },
                }}
                style={{ borderWidth: 2, borderStyle: 'solid' }}
              >
                {state === 'done' ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </motion.div>
              {i < STEPS.length - 1 && (
                <motion.div
                  className="mx-0.5 h-[2px] flex-1"
                  initial={false}
                  animate={{ backgroundColor: i < display ? '#2B91E5' : '#E2E6EB', opacity: revealed ? 1 : 0 }}
                  transition={{ duration: 0.22, delay: revealed ? i * 0.06 : 0 }}
                />
              )}
            </div>
          )
        })}
      </div>

      <motion.p
        key={display >= STEPS.length ? 'complete' : STEPS[display]}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-2 text-[11px] font-semibold text-ink-soft"
      >
        {display >= STEPS.length ? (
          <span className="text-accent-green">✓ All steps complete</span>
        ) : (
          <>
            Step {display + 1} of {STEPS.length} <span className="text-ink">· {STEPS[display]}</span>
          </>
        )}
      </motion.p>
    </div>
  )
}
