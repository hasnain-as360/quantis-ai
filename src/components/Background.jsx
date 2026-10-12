import { motion } from 'framer-motion'

// Persists for the whole reel so the canvas color never seams between
// scenes. The three blooms breathe continuously and slowly — this is the
// "volumetric pastel gradient flares reacting dynamically" layer.
export default function Background() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-canvas">
      <motion.div
        className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-bloom-lavender/40 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[26%] -right-20 w-80 h-80 rounded-full bg-bloom-cyan/40 blur-3xl"
        animate={{ x: [0, -14, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 left-10 w-80 h-80 rounded-full bg-bloom-mint/40 blur-3xl"
        animate={{ x: [0, 16, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
