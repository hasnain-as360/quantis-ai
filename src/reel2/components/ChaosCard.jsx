import { motion } from 'framer-motion'

const CARD_W = 132
const CARD_H = 88
const HALF_W = CARD_W / 2
const HALF_H = CARD_H / 2

// A "mismatched platform" tile for Scene 1 — each one styled like a
// different product (own corner radius, own accent, own content sketch)
// rather than a single reused card template, per the brief's "mismatched
// UI cards representing different platforms."
export default function ChaosCard({ def, phase }) {
  const { icon: Icon, accent, radius, kind, label } = def

  const restTarget = { x: def.x - HALF_W, y: def.y - HALF_H, scale: def.scale, opacity: 1, rotate: def.rotate }
  const clearingTarget = {
    x: -HALF_W,
    y: -HALF_H,
    scale: 0,
    opacity: 0,
    rotate: def.rotate + (def.x > 0 ? 130 : -130),
  }
  const initial = {
    x: def.x * 2.3 - HALF_W,
    y: def.y * 2.3 - HALF_H,
    scale: def.scale * 0.5,
    opacity: 0,
    rotate: def.rotate * 1.7,
  }

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex flex-col overflow-hidden border border-black/[0.06] bg-white shadow-lg"
      style={{ width: CARD_W, height: CARD_H, borderRadius: radius, zIndex: def.z }}
      initial={initial}
      animate={phase === 'clearing' ? clearingTarget : restTarget}
      transition={
        phase === 'clearing'
          ? { duration: 0.5, ease: [0.6, 0, 1, 1], delay: (def.delay % 220) / 1000 }
          : { type: 'spring', stiffness: 140, damping: 16, delay: def.delay / 1000 }
      }
    >
      <div className="flex items-center gap-1.5 px-2.5 pt-2.5">
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-white"
          style={{ background: accent }}
        >
          <Icon className="h-3 w-3" strokeWidth={2.5} />
        </span>
        <span className="truncate text-[9px] font-semibold text-ink-soft">{label}</span>
      </div>

      <div className="flex flex-1 items-center px-2.5 pb-2.5 pt-1.5">
        {kind === 'lines' && (
          <div className="w-full space-y-1">
            <div className="h-1.5 w-[85%] rounded-full bg-slate-200" />
            <div className="h-1.5 w-[60%] rounded-full bg-slate-200" />
          </div>
        )}
        {kind === 'list' && (
          <div className="w-full space-y-1.5">
            {[0, 1, 2].map((r) => (
              <div key={r} className="flex items-center gap-1.5">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: `${accent}33` }} />
                <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        )}
        {kind === 'chart' && (
          <div className="flex h-9 w-full items-end gap-1">
            {[30, 60, 40, 75, 50].map((h, i) => (
              <span key={i} className="w-2.5 rounded-t" style={{ height: `${h}%`, background: `${accent}99` }} />
            ))}
          </div>
        )}
        {kind === 'browser' && (
          <div className="w-full rounded-md border border-slate-200 p-1.5">
            <div className="mb-1 h-1.5 w-1/2 rounded-full bg-slate-200" />
            <div className="h-6 w-full rounded-sm" style={{ background: `${accent}22` }} />
          </div>
        )}
        {kind === 'calendar' && (
          <div className="grid w-full grid-cols-5 gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="aspect-square rounded-sm"
                style={{ background: i === 4 ? accent : '#eef1f4' }}
              />
            ))}
          </div>
        )}
        {kind === 'social' && (
          <div className="flex w-full items-center gap-2">
            <span className="h-7 w-7 shrink-0 rounded-full" style={{ background: `${accent}33` }} />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-slate-200" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
