import { useCurrentFrame } from 'remotion'
import { COLOR, FONT } from '../theme'
import { pop, stagger } from '../anim'

const BAR = {
  brand: COLOR.brand,
  green: COLOR.green,
  purple: COLOR.purple,
  orange: COLOR.orange,
}

// A seeded-looking but fixed sparkline shape per tint — cheap, deterministic,
// and gives each card's large middle area something real to show instead of
// dead space, matching the real dashboard's own mini-charts.
const SHAPES = {
  brand: [40, 55, 38, 62, 50, 70, 58, 78],
  green: [50, 48, 60, 55, 68, 62, 74, 80],
  purple: [30, 50, 42, 65, 55, 60, 72, 68],
  orange: [60, 52, 58, 45, 50, 40, 35, 30],
}

export default function MetricTile({ Icon, label, value, delta, deltaUp, tint, index, start, fps }) {
  const frame = useCurrentFrame()
  const s = pop(frame, fps, stagger(index, start, 6))
  const opacity = Math.min(1, s)
  const y = (1 - Math.min(1, s)) * 26
  const scale = 0.9 + Math.min(1, s) * 0.1
  const barColor = BAR[tint] ?? BAR.brand
  const shape = SHAPES[tint] ?? SHAPES.brand
  const drawT = Math.min(1, Math.max(0, (frame - (start + index * 6 + 6)) / 18))

  const points = shape
    .map((v, i) => `${(i / (shape.length - 1)) * 100},${100 - v}`)
    .join(' ')

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        border: `1px solid ${COLOR.borderSoft}`,
        background: 'rgba(255,255,255,0.8)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: barColor }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: barColor, display: 'flex' }}>
          <Icon size={22} />
        </span>
        <span style={{ fontFamily: FONT.family, fontSize: 17, fontWeight: 600, color: COLOR.inkSoft }}>{label}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: 90, overflow: 'visible' }}>
          <polyline
            points={points}
            fill="none"
            stroke={barColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.55}
            style={{
              strokeDasharray: 400,
              strokeDashoffset: 400 * (1 - drawT),
            }}
          />
        </svg>
      </div>

      <div>
        <p style={{ margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 56, lineHeight: 1, color: COLOR.ink }}>{value}</p>
        <p style={{ margin: '10px 0 0', fontFamily: FONT.family, fontSize: 16, color: deltaUp ? COLOR.green : 'rgba(75,85,102,0.6)' }}>
          {delta}
        </p>
      </div>
    </div>
  )
}
