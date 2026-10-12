import { motion } from 'framer-motion'

// A stylized pointer that moves to (x, y) and does a small press-bounce
// when `clicked` flips true — sells the "cursor clicks the button" beat
// without needing a real DOM click (nothing here is actually interactive;
// this is a recorded animation, not a live app).
export default function Cursor({ x, y, clicked, show }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-50"
      initial={{ opacity: 0, x: x - 60, y: y - 60 }}
      animate={{ opacity: show ? 1 : 0, x, y, scale: clicked ? 0.82 : 1 }}
      transition={{ x: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }, y: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }, scale: { duration: 0.14 } }}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M4 2.5 L21 12.5 L13.2 14.3 L17.5 22.4 L14.3 24 L10 15.9 L4.6 21.3 Z"
          fill="#111318"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      {clicked && (
        <motion.span
          className="absolute left-1 top-1 h-6 w-6 rounded-full border-2 border-brand"
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}
