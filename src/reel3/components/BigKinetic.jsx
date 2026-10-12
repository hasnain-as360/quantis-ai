import { motion, AnimatePresence } from 'framer-motion'

function mulberry32(seed) {
  let a = seed
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(70420)
// A little per-word rotation jitter so the punch-in reads as organic energy
// rather than a mechanically uniform bounce — computed once, not per render.
const JITTER = Array.from({ length: 40 }, () => (rand() - 0.5) * 14)

const word = {
  hidden: { opacity: 0, y: 34, scale: 0.6, rotate: 0 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: [JITTER[i % JITTER.length], 0],
    transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] },
  }),
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075 } },
}

// Scene 1's whole job: state the problem in plain, huge type — but with
// real kinetic energy (word-by-word punch-in, not a single static fade) and
// a softly breathing background glow, instead of static text dropped on a
// blank canvas. Still no UI, no scrim — that restraint is what makes Scene
// 3's actual product screens land harder by contrast.
export default function BigKinetic({ activeKey, children, accent }) {
  const words = typeof children === 'string' ? children.split(' ') : null

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-24">
      {/* ambient energy: two soft brand-tinted glows drifting slowly */}
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl"
        animate={{ x: [-60, 60, -60], y: [-30, 30, -30] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute h-[320px] w-[320px] rounded-full bg-accent-purple/10 blur-3xl"
        animate={{ x: [50, -50, 50], y: [40, -20, 40] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        {activeKey && (
          <motion.p
            key={activeKey}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -22, scale: 0.96, transition: { duration: 0.28 } }}
            className="relative text-center text-[52px] leading-[1.08] font-bold tracking-tight text-ink"
          >
            {words
              ? words.map((w, i) => {
                  const isAccent = accent && w.replace(/[^A-Za-z]/g, '') === accent
                  return (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={word}
                      className={`inline-block ${isAccent ? 'mr-[0.42em] text-brand' : 'mr-[0.28em]'}`}
                    >
                      {w}
                    </motion.span>
                  )
                })
              : children}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
