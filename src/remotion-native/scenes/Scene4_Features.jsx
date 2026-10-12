import { useCurrentFrame, useVideoConfig } from 'remotion'
import { Sparkles, Share2, Users, LineChart, Mail, Music2, Camera } from 'lucide-react'
import { COLOR, FONT } from '../theme'
import { ease, pop } from '../anim'
import { FEATURE_BEATS } from '../timing'

// Icon COMPONENTS, not <Icon/> elements — see DashboardGrid.jsx for why.
const FEATURES = [
  {
    Icon: Sparkles,
    title: 'AI Concept & Copy',
    desc: 'Strategy advisor and concept suggestions turn a blank page into a full campaign brief.',
    tint: COLOR.brand,
    demo: 'typing',
  },
  {
    Icon: Share2,
    title: 'Omnichannel Publishing',
    desc: 'Email, social, and video reels — routed and scheduled from one campaign.',
    tint: COLOR.purple,
    demo: 'channels',
  },
  {
    Icon: Users,
    title: 'Smart Audience Targeting',
    desc: 'Segment and enrich hundreds of thousands of contacts without spreadsheets.',
    tint: COLOR.green,
    demo: 'contacts',
  },
  {
    Icon: LineChart,
    title: 'Real-Time Analytics',
    desc: 'Opens, clicks, and reach on one bento dashboard — refreshed automatically.',
    tint: COLOR.orange,
    demo: 'chart',
  },
]

// No card/border wrapper on any of these — the content itself (text, chart,
// icons) stands alone on the canvas. Each is sized to occupy a comparable
// visual footprint so the four features feel consistent in scale.
function Demo({ kind, tint, frame }) {
  if (kind === 'typing') {
    const lines = ['Personal Loans, A Clearer Picture', 'Compare rates side-by-side…']
    return (
      <div style={{ width: 640 }}>
        {lines.map((l, i) => {
          const t = ease(frame, 0, 1, i * 15, 20)
          const chars = Math.round(l.length * t)
          return (
            <p key={l} style={{ margin: i ? '22px 0 0' : 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 34, color: COLOR.ink, whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {l.slice(0, chars)}
            </p>
          )
        })}
      </div>
    )
  }
  if (kind === 'channels') {
    const icons = [<Mail size={38} key="m" />, <Music2 size={38} key="t" />, <Camera size={38} key="c" />, <Share2 size={38} key="s" />]
    return (
      <div style={{ display: 'flex', gap: 26 }}>
        {icons.map((Icon, i) => {
          const s = Math.min(1, pop(frame, 30, i * 4))
          return (
            <span
              key={i}
              style={{
                width: 92,
                height: 92,
                borderRadius: 22,
                background: tint,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: s,
                transform: `translateY(${(1 - s) * 10}px) scale(${s})`,
              }}
            >
              {Icon}
            </span>
          )
        })}
      </div>
    )
  }
  if (kind === 'contacts') {
    const s = Math.min(1, pop(frame, 30, 0))
    return (
      <div style={{ textAlign: 'center', transform: `scale(${0.9 + s * 0.1})`, opacity: s }}>
        <p style={{ margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 88, color: COLOR.ink, lineHeight: 1 }}>678,591</p>
        <p style={{ margin: '18px 0 0', fontFamily: FONT.family, fontSize: 24, color: COLOR.inkSoft }}>contacts across 2 lists &middot; 100% subscribed</p>
      </div>
    )
  }
  // chart
  const bars = [40, 65, 30, 80, 55, 70]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, height: 220 }}>
      {bars.map((h, i) => {
        const t = ease(frame, 0, 1, i * 3, 12)
        return <span key={i} style={{ width: 42, height: `${h * t}%`, borderRadius: '8px 8px 0 0', background: tint }} />
      })}
    </div>
  )
}

export default function Scene4_Features() {
  const frame = useCurrentFrame()
  const activeIdx = FEATURE_BEATS.findIndex(([s, e]) => frame >= s && frame < e)
  const reachedIdx = FEATURE_BEATS.reduce((acc, [s], i) => (frame >= s ? i : acc), 0)
  const idx = activeIdx === -1 ? reachedIdx : activeIdx
  const beatStart = FEATURE_BEATS[idx][0]
  const localFrame = frame - beatStart

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLOR.canvas, display: 'flex', alignItems: 'center', gap: 80, padding: '0 110px' }}>
      <div style={{ width: 580, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ margin: '0 0 6px', fontFamily: FONT.family, fontWeight: 700, fontSize: 16, letterSpacing: '0.06em', color: 'rgba(75,85,102,0.7)', textTransform: 'uppercase' }}>
          Core Features
        </p>
        {FEATURES.map((f, i) => {
          const isActive = i === idx
          const reached = i <= reachedIdx
          return (
            <div
              key={f.title}
              style={{
                borderRadius: 18,
                border: `1px solid ${isActive ? COLOR.brand : '#E7EAEE'}`,
                background: isActive ? '#EAF4FD' : COLOR.white,
                opacity: reached ? 1 : 0.35,
                padding: '22px 26px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <span style={{ width: 64, height: 64, borderRadius: 16, background: f.tint, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.Icon size={30} />
                </span>
                <p style={{ margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 25, color: COLOR.ink }}>{f.title}</p>
              </div>
              {isActive && (
                <p style={{ margin: '14px 0 0', paddingLeft: 82, fontFamily: FONT.family, fontSize: 17, lineHeight: 1.45, color: COLOR.inkSoft }}>{f.desc}</p>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Demo kind={FEATURES[idx].demo} tint={FEATURES[idx].tint} frame={localFrame} />
      </div>
    </div>
  )
}
