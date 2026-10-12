import { AnimatePresence } from 'framer-motion'
import Caption from './Caption'

// Render this unconditionally in a scene; pass `activeKey={null}` when that
// scene has no caption to show right now. Because the AnimatePresence lives
// here (outside the conditional), the exit animation plays correctly both
// when the text changes AND when the caption disappears for good.
export default function CaptionSlot({ activeKey, fast = false, scrim = false, center = false, children }) {
  const position = center
    ? 'inset-0 flex items-center justify-center'
    : 'inset-x-0 bottom-[6%] flex justify-center'

  return (
    <div className={`absolute ${position} z-40 px-9 pointer-events-none`}>
      <AnimatePresence mode="wait">
        {activeKey && (
          <Caption key={activeKey} fast={fast} scrim={scrim}>
            {children}
          </Caption>
        )}
      </AnimatePresence>
    </div>
  )
}
