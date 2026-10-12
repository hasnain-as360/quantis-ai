import { useCurrentFrame } from 'remotion'
import { COLOR, FONT } from '../theme'
import { pop } from '../anim'

// Pulled in from the literal viewport edges (was 48/90px) — on a 1920x1080
// canvas that read as "stuck in the corners" with a dead void in between.
const CORNER = {
  'top-left': { top: 130, left: 160 },
  'top-right': { top: 130, right: 160 },
  'bottom-left': { bottom: 170, left: 160 },
  'bottom-right': { bottom: 170, right: 160 },
}
const FROM = {
  'top-left': [-70, -24],
  'top-right': [70, -24],
  'bottom-left': [-70, 24],
  'bottom-right': [70, 24],
}

export default function PopupToast({ Icon, text, tint, corner, start, fps }) {
  const frame = useCurrentFrame()
  const s = Math.min(1, pop(frame, fps, start))
  const [fx, fy] = FROM[corner]
  const x = fx * (1 - s)
  const y = fy * (1 - s)

  return (
    <div
      style={{
        position: 'absolute',
        ...CORNER[corner],
        opacity: s,
        transform: `translate(${x}px, ${y}px) scale(${0.85 + s * 0.15})`,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 18,
        border: `1px solid ${COLOR.borderSoft}`,
        boxShadow: '0 16px 36px rgba(15,23,42,0.16)',
        padding: '18px 30px 18px 18px',
      }}
    >
      <span
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: tint,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={26} />
      </span>
      <span style={{ fontFamily: FONT.family, fontWeight: 700, fontSize: 21, color: COLOR.ink, whiteSpace: 'nowrap' }}>{text}</span>
    </div>
  )
}
