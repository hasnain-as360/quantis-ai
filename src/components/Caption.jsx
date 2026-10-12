import { motion } from 'framer-motion'

// Purely presentational. AnimatePresence must wrap the *conditional* usage
// of this component (see CaptionSlot) — putting it in here instead wouldn't
// catch the case where a parent scene stops rendering a caption entirely.
export default function Caption({ children, fast = false, scrim = false }) {
  const duration = fast ? 0.32 : 0.45

  // Over plain canvas, a soft light-colored text-shadow is enough contrast
  // and keeps the moment feeling open. Once a caption has to sit near or
  // over opaque glass UI (a busy dashboard, stacked cards), that halo isn't
  // reliable — `scrim` swaps in an actual frosted backing plate instead.
  const className = scrim
    ? 'max-w-[88%] rounded-2xl bg-canvas/85 px-5 py-3 text-center text-[21px] leading-[1.3] font-semibold text-ink shadow-lg backdrop-blur-md'
    : 'max-w-[86%] text-center text-[27px] leading-[1.15] font-semibold text-ink [text-shadow:0_2px_24px_rgba(248,249,250,0.95),0_1px_3px_rgba(248,249,250,0.9)]'

  return (
    <motion.p
      initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.p>
  )
}
