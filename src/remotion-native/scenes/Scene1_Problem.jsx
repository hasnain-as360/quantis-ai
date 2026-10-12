import { useCurrentFrame, useVideoConfig } from 'remotion'
import { COLOR, FONT } from '../theme'
import { pop } from '../anim'
import { PROBLEM } from '../timing'

function Glow({ frame, cx, cy, radius, color, speed, phase = 0 }) {
  const dx = Math.sin(frame / speed + phase) * 60
  const dy = Math.cos(frame / speed + phase) * 30
  return (
    <div
      style={{
        position: 'absolute',
        left: cx + dx - radius / 2,
        top: cy + dy - radius / 2,
        width: radius,
        height: radius,
        borderRadius: '50%',
        background: color,
        filter: 'blur(70px)',
      }}
    />
  )
}

function Line({ frame, fps, start, words, accent }) {
  return (
    <p
      style={{
        margin: 0,
        textAlign: 'center',
        fontFamily: FONT.family,
        fontWeight: 700,
        fontSize: 52,
        lineHeight: 1.08,
        letterSpacing: '-0.01em',
        color: COLOR.ink,
      }}
    >
      {words.map((w, i) => {
        const isAccent = accent && w.replace(/[^A-Za-z]/g, '') === accent
        const s = pop(frame, fps, start + i * 5)
        const scale = Math.max(0, Math.min(1.06, s))
        const opacity = Math.max(0, Math.min(1, s * 1.3))
        const y = (1 - Math.min(1, s)) * 30
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: isAccent ? '0.5em' : '0.28em',
              color: isAccent ? COLOR.brand : COLOR.ink,
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
            }}
          >
            {w}
          </span>
        )
      })}
    </p>
  )
}

// Scene 1: pure kinetic typography, no UI — two clauses, each word
// springing in individually rather than the whole line fading as one
// block. Two soft glows drift behind it for a touch of ambient energy.
export default function Scene1_Problem() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const [l1s, l1e] = PROBLEM.line1
  const [l2s, l2e] = PROBLEM.line2
  const showLine1 = frame >= l1s && frame < l2s + 8 // matches the fade-out duration below exactly
  const showLine2 = frame >= l2s

  // fade the previous line out quickly once the next one starts
  const line1Out = frame >= l2s ? Math.max(0, 1 - (frame - l2s) / 8) : 1
  const line2In = frame >= l2s ? Math.min(1, (frame - l2s) / 8) : 0

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLOR.canvas, overflow: 'hidden' }}>
      <Glow frame={frame} cx={520} cy={280} radius={420} color="rgba(43,145,229,0.12)" speed={90} />
      <Glow frame={frame} cx={1400} cy={200} radius={320} color="rgba(124,92,255,0.1)" speed={110} phase={2} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 220px' }}>
        {showLine1 && (
          <div style={{ position: 'absolute', opacity: line1Out }}>
            <Line frame={frame} fps={fps} start={l1s} words={'Marketing today means...'.split(' ')} />
          </div>
        )}
        {showLine2 && (
          <div style={{ position: 'absolute', opacity: frame < l2s + 8 ? line2In : 1 }}>
            <Line
              frame={frame}
              fps={fps}
              start={l2s}
              words={'juggling a dozen disconnected tools.'.split(' ')}
              accent="disconnected"
            />
          </div>
        )}
      </div>
    </div>
  )
}
