import { motion } from 'framer-motion'

const container = (startDelayMs, staggerMs) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: staggerMs / 1000, delayChildren: startDelayMs / 1000 },
  },
})

const word = {
  hidden: { opacity: 0, y: 16, scale: 0.92, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
}

// Word-by-word kinetic reveal, sitting on its own frosted bar so it stays
// legible over whatever live UI is underneath — every reel2 scene has busy
// UI behind the caption, so (unlike reel 1's Caption) a scrim isn't
// optional here, it's the only mode.
export default function KineticCaption({
  text,
  startDelayMs = 0,
  staggerMs = 90,
  emphasize,
  top,
}) {
  const words = text.split(' ')

  return (
    <div
      className="absolute inset-x-4 z-40 flex justify-center pointer-events-none"
      style={{ top }}
    >
      <motion.p
        initial="hidden"
        animate="show"
        variants={container(startDelayMs, staggerMs)}
        className="max-w-[94%] rounded-2xl bg-white/88 px-4 py-3 text-center text-[19px] leading-snug font-semibold text-ink shadow-[0_10px_30px_rgba(15,23,42,0.16)] backdrop-blur-md"
      >
        {words.map((w, i) => {
          const isEmphasis = emphasize && w.replace(/[^A-Za-z]/g, '') === emphasize
          return (
            <motion.span
              key={i}
              variants={word}
              // `scale()` is paint-only — it doesn't grow this element's
              // layout box, so margin has to over-compensate for the visual
              // overflow the scale adds, or the next word visually crowds
              // against it. origin-left points all of that growth rightward
              // (into this word's own margin) rather than splitting it
              // across both neighbors, which is what mr-[1em] is sized for.
              className={`inline-block ${isEmphasis ? 'mr-[1em] text-brand scale-[1.12] origin-left' : 'mr-[0.28em]'}`}
            >
              {w}
            </motion.span>
          )
        })}
      </motion.p>
    </div>
  )
}
