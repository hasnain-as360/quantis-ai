import { useCurrentFrame } from 'remotion'

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

function makeParticles(count, fromRight, width, height, rand) {
  const out = []
  for (let i = 0; i < count; i++) {
    const edgeX = fromRight ? width + 10 : -10
    const dirSign = fromRight ? -1 : 1
    out.push({
      x0: edgeX,
      y0: height * (0.24 + rand() * 0.4),
      // Spread scaled for a 1920-wide canvas — the original values were
      // tuned for a ~480-960px reference canvas and only ever reached a
      // sliver of a full-HD frame's width.
      dx: dirSign * (140 + rand() * 380),
      dy: -(80 + rand() * 180),
      fall: 480 + rand() * 420,
      rot: (rand() - 0.5) * 720,
      w: 10 + rand() * 12,
      h: 18 + rand() * 16,
      color: COLORS[i % COLORS.length],
      delayF: Math.round(rand() * 14), // frames, not ms
      durF: Math.round((1.2 + rand() * 0.7) * 30), // ~30fps worth of frames
    })
  }
  return out
}

const cache = new Map()
function particlesFor(w, h) {
  const key = `${w}x${h}`
  if (!cache.has(key)) {
    const rand = mulberry32(51426)
    cache.set(key, [...makeParticles(38, false, w, h, rand), ...makeParticles(38, true, w, h, rand)])
  }
  return cache.get(key)
}

// Every particle's position at the current frame is computed directly from
// frame number — a pure function, no animation library, no real-time
// component anywhere. Whatever frame Remotion asks for, this returns the
// exact same answer every time, which is what "no ghosting, ever" actually
// requires (not just "usually looks fine").
export default function ConfettiField({ start, width, height }) {
  const frame = useCurrentFrame()
  const particles = particlesFor(width, height)

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const local = frame - start - p.delayF
        if (local < 0) return null
        const t = Math.min(1, local / p.durF)
        // 0->0.3 burst outward, 0.3->1 falls under "gravity" — matches the
        // original easeOut-then-easeIn two-phase feel, as a pure lookup.
        const burstT = Math.min(1, t / 0.3)
        const fallT = Math.max(0, (t - 0.3) / 0.7)
        const eo = 1 - Math.pow(1 - burstT, 3) // ease-out cubic
        const ei = fallT * fallT // ease-in quad
        const x = p.dx * eo + p.dx * 0.15 * ei
        const y = p.dy * eo + p.fall * ei
        const opacity = t < 0.3 ? eo : Math.max(0, 1 - ei)
        if (opacity <= 0.01) return null
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: p.x0,
              top: p.y0,
              width: p.w,
              height: p.h,
              borderRadius: 1,
              background: p.color,
              opacity,
              transform: `translate(${x}px, ${y}px) rotate(${p.rot * t}deg)`,
            }}
          />
        )
      })}
    </div>
  )
}
