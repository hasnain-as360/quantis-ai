import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logo.png'

// Shared between Scene 3's "Meet Precision" pivot (small, brief, fades once
// the shell takes over) and Scene 5's outro (larger, holds as the final
// frame) — same visual grammar, different scale/duration, so the brand
// moment reads as consistent rather than two unrelated logo treatments.
export default function LogoMoment({ show, variant = 'pivot', topLabel }) {
  const width = variant === 'outro' ? 300 : 220
  const glow = variant === 'outro' ? 340 : 240

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="absolute rounded-full bg-brand/20 blur-3xl"
            style={{ width: glow, height: glow }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.25, 1], opacity: [0, 0.9, 0.5] }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
          {topLabel && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative text-[22px] font-semibold tracking-tight text-ink-soft"
            >
              {topLabel}
            </motion.p>
          )}
          <motion.img
            src={logo}
            alt="Precision by CyberGen"
            style={{ width }}
            className="relative"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 15 }}
            draggable={false}
          />
          {variant === 'outro' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative text-[20px] font-semibold text-ink"
            >
              Stop guessing. <span className="text-brand">Start shipping.</span>
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
