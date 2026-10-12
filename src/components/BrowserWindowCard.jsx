import { motion } from 'framer-motion'
import { TINTS } from '../data/tints'

const CARD_W = 144
const CARD_H = 96
const HALF_W = CARD_W / 2
const HALF_H = CARD_H / 2

// One "other tool" window in the chaos field. Position math is done in
// plain x/y translate offsets (not CSS left/top + negative margins) so the
// centering math and the scatter offset can just be summed — one less thing
// fighting Framer Motion's transform-based animation.
export default function BrowserWindowCard({ def, phase }) {
  const Icon = def.icon
  const tint = TINTS[def.tint] ?? TINTS.brand

  const restTarget = {
    x: def.x - HALF_W,
    y: def.y - HALF_H,
    scale: def.scale,
    opacity: 1,
    rotate: def.rotate,
  }
  const clearingTarget = {
    x: -HALF_W,
    y: -HALF_H,
    scale: 0,
    opacity: 0,
    // extra spin on the way in, direction depending on which side it flies
    // in from, sells the "sucked into a vortex" read
    rotate: def.rotate + (def.x > 0 ? 140 : -140),
  }
  const initial = {
    x: def.x * 2.4 - HALF_W,
    y: def.y * 2.4 - HALF_H,
    scale: def.scale * 0.5,
    opacity: 0,
    rotate: def.rotate * 1.8,
  }

  const restTransition = { type: 'spring', stiffness: 130, damping: 15, delay: def.staggerDelay / 1000 }
  const clearTransition = { duration: 0.55, ease: [0.6, 0, 1, 1], delay: (def.staggerDelay % 250) / 1000 }

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex flex-col overflow-hidden rounded-xl border border-white/80 bg-white/70 shadow-lg backdrop-blur-md"
      style={{ width: CARD_W, height: CARD_H, zIndex: def.z }}
      initial={initial}
      animate={phase === 'clearing' ? clearingTarget : restTarget}
      transition={phase === 'clearing' ? clearTransition : restTransition}
    >
      <div className="flex h-5 shrink-0 items-center gap-1.5 border-b border-black/5 bg-white/40 px-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
      </div>

      <div className={`flex flex-1 items-center justify-center ${tint.chip}`}>
        {def.kind === 'icon' && <Icon className={`h-8 w-8 ${tint.text}`} strokeWidth={1.75} />}

        {def.kind === 'chart' && (
          <div className="flex h-10 items-end gap-1.5">
            {[40, 65, 30, 80, 55].map((h, idx) => (
              <span key={idx} className={`w-2.5 rounded-t ${tint.chart}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        )}

        {def.kind === 'list' && (
          <div className="w-full space-y-1.5 px-3">
            <div className="h-2 w-[70%] rounded-full bg-slate-400/40" />
            <div className="h-2 w-[85%] rounded-full bg-slate-400/30" />
            <div className="h-2 w-[55%] rounded-full bg-slate-400/40" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
