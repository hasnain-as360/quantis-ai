import { motion } from 'framer-motion'
import { STAGE_W, STAGE_H } from '../../data/constants'

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

const COLORS = ['#2B91E5', '#7C5CFF', '#D6336C', '#F59E0B', '#17A673']

// Deliberately plain rectangles animated with transform + opacity only — no
// backdrop-blur, no filters — so ~50 simultaneous particles stay cheap to
// render during capture (see capture.mjs's note on why that matters here).
function makeParticles(count, fromRight, stageW, stageH, rand) {
  const out = []
  for (let i = 0; i < count; i++) {
    const edgeX = fromRight ? stageW + 10 : -10
    const dirSign = fromRight ? -1 : 1
    out.push({
      id: `${fromRight ? 'r' : 'l'}${i}`,
      x0: edgeX,
      y0: stageH * (0.28 + rand() * 0.32),
      dx: dirSign * (60 + rand() * 170),
      dy: -(40 + rand() * 90),
      fall: 260 + rand() * 220,
      rot: (rand() - 0.5) * 720,
      w: 5 + rand() * 6,
      h: 9 + rand() * 8,
      color: COLORS[i % COLORS.length],
      delay: rand() * 140,
      dur: 1.1 + rand() * 0.6,
    })
  }
  return out
}

// Cached per stage size — the seeded RNG must run in one continuous
// sequence for a given (w, h) pair, so this can't just be a plain
// module-level constant once more than one stage size is in play (reel 2's
// portrait canvas vs. reel 3's landscape one).
const cache = new Map()
function particlesFor(stageW, stageH) {
  const key = `${stageW}x${stageH}`
  if (!cache.has(key)) {
    const rand = mulberry32(51426)
    cache.set(key, [...makeParticles(26, false, stageW, stageH, rand), ...makeParticles(26, true, stageW, stageH, rand)])
  }
  return cache.get(key)
}

// `stageW`/`stageH` default to reel 2's own (portrait) canvas so existing
// callers there don't need to change; reel 3 passes its landscape size
// explicitly since the edge-burst positions are computed from it.
export default function Confetti({ show, stageW = STAGE_W, stageH = STAGE_H }) {
  if (!show) return null
  const particles = particlesFor(stageW, stageH)
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-[1px]"
          style={{ left: p.x0, top: p.y0, width: p.w, height: p.h, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: [0, p.dx, p.dx * 1.15],
            y: [0, p.dy, p.dy + p.fall],
            opacity: [0, 1, 0],
            rotate: p.rot,
          }}
          transition={{ duration: p.dur, delay: p.delay / 1000, times: [0, 0.3, 1], ease: ['easeOut', 'easeIn'] }}
        />
      ))}
    </div>
  )
}
