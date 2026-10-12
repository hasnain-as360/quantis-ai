import { useBeatSequencer } from '../hooks/useBeatSequencer'
import { resolveReel } from '../reels'

// Full-bleed, chrome-less render used only for capture (visit with
// ?record=1&reel=<key>). A capture tool points its viewport at exactly
// this reel's export size and records the whole page — no dark backdrop,
// no transport controls, no cropping math required on the capture side.
export default function RecordExport({ reelKey }) {
  const { beats, Canvas, stageW, stageH, exportW, exportH, exportScale } = resolveReel(reelKey)
  const { index, beat, playing } = useBeatSequencer(beats)
  const done = !playing && index === beats.length - 1

  return (
    <div style={{ width: exportW, height: exportH, overflow: 'hidden', background: '#F8F9FA' }}>
      <div
        style={{
          width: stageW,
          height: stageH,
          position: 'relative',
          overflow: 'hidden',
          transform: `scale(${exportScale})`,
          transformOrigin: 'top left',
        }}
      >
        <Canvas index={index} beat={beat} />
      </div>

      {/* Capture-script hook: a headless browser polls for this so it knows
          exactly when the sequence has reached and settled on its final
          held frame, instead of guessing a wall-clock duration. */}
      <div
        data-reel-status={done ? 'done' : 'playing'}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }}
      />
    </div>
  )
}
