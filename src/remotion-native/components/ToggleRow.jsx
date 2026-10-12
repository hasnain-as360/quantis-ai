import { useCurrentFrame } from 'remotion'
import { COLOR, FONT } from '../theme'
import { fadeRise, ease } from '../anim'

const TINT = {
  brand: COLOR.brand,
  purple: COLOR.purple,
  inkBlack: COLOR.inkBlack,
  instagram: 'linear-gradient(135deg, #833AB4 0%, #E1306C 55%, #F77737 100%)',
}

export default function ToggleRow({ Icon, label, sub, tint, on, index, start }) {
  const frame = useCurrentFrame()
  const enter = fadeRise(frame, start + index * 4, 12, 14)
  const toggleT = ease(frame, 0, 1, start + index * 4 + 4, 8)
  const trackColor = on ? interpColor(COLOR.border, COLOR.brand, toggleT) : COLOR.border

  return (
    <div
      style={{
        opacity: enter.opacity,
        transform: `translateY(${enter.y}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        border: `1px solid ${COLOR.borderSoft}`,
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        padding: '20px 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
        <span
          style={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            background: TINT[tint] ?? TINT.brand,
          }}
        >
          <Icon size={26} />
        </span>
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 19, color: COLOR.ink }}>{label}</p>
          <p style={{ margin: '2px 0 0', fontFamily: FONT.family, fontSize: 14.5, color: COLOR.inkSoft }}>{sub}</p>
        </div>
      </div>
      <span style={{ position: 'relative', width: 56, height: 30, borderRadius: 999, background: trackColor, flexShrink: 0 }}>
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: 3 + toggleT * 26,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
          }}
        />
      </span>
    </div>
  )
}

function interpColor(a, b, t) {
  const pa = hexToRgb(a)
  const pb = hexToRgb(b)
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t)
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t)
  const bch = Math.round(pa[2] + (pb[2] - pa[2]) * t)
  return `rgb(${r},${g},${bch})`
}
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
