import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useBeatSequencer } from '../hooks/useBeatSequencer'
import { REELS, DEFAULT_REEL, resolveReel } from '../reels'

function initialReel() {
  if (typeof window === 'undefined') return DEFAULT_REEL
  const q = new URLSearchParams(window.location.search).get('reel')
  return REELS[q] ? q : DEFAULT_REEL
}

export default function Stage() {
  const [reelKey, setReelKey] = useState(initialReel)
  const { beats, Canvas, stageW, stageH } = resolveReel(reelKey)
  const { index, beat, playing, play, pause, restart, seekTo } = useBeatSequencer(beats)
  const total = beats.reduce((sum, b) => sum + b.duration, 0)
  const elapsed = beats.slice(0, index).reduce((sum, b) => sum + b.duration, 0)

  function switchReel(key) {
    setReelKey(key)
    const url = new URL(window.location.href)
    url.searchParams.set('reel', key)
    window.history.replaceState({}, '', url)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-slate-950 py-10">
      <div className="flex gap-2">
        {Object.keys(REELS).map((key) => (
          <button
            key={key}
            onClick={() => switchReel(key)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
              key === reelKey ? 'bg-brand text-white' : 'glass-dark text-white/60 hover:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* ============ RECORDING AREA — crop your capture to exactly this box ============ */}
      <div
        className="relative overflow-hidden bg-canvas shadow-2xl shadow-black/60 ring-1 ring-white/15"
        style={{ width: stageW, height: stageH }}
      >
        <Canvas index={index} beat={beat} />
      </div>
      {/* ============ everything below this line is production UI, never captured ============ */}

      <div className="flex w-[480px] max-w-[92vw] flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={restart}
            className="rounded-full p-2.5 text-white glass-dark transition hover:bg-white/10"
            aria-label="Restart"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={playing ? pause : play}
            className="rounded-full p-2.5 text-white glass-dark transition hover:bg-white/10"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <span className="w-24 text-xs tabular-nums text-white/50">
            {(elapsed / 1000).toFixed(1)}s / {(total / 1000).toFixed(1)}s
          </span>
        </div>

        <div className="flex w-full gap-1">
          {beats.map((b, i) => (
            <button
              key={b.id}
              onClick={() => seekTo(i)}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
              title={b.caption || b.id}
              aria-label={`Jump to: ${b.caption || b.id}`}
            >
              <motion.span
                className="block h-full bg-brand"
                initial={false}
                animate={{ width: i < index ? '100%' : i === index ? '100%' : '0%' }}
                transition={
                  i === index && playing ? { duration: b.duration / 1000, ease: 'linear' } : { duration: 0.15 }
                }
              />
            </button>
          ))}
        </div>
        <p className="text-center text-[11px] text-white/40">
          Click a segment to jump to that beat · only the frame above is meant to be recorded
        </p>
      </div>
    </div>
  )
}
