import { useCurrentFrame, useVideoConfig } from 'remotion'
import { Mail, Camera, Music2, Globe, BarChart3, MessageCircle, AlertTriangle, RefreshCw, TrendingDown } from 'lucide-react'
import { COLOR } from '../theme'
import { ease } from '../anim'
import Caption from '../components/Caption'
import PopupToast from '../components/PopupToast'
import { DETAIL } from '../timing'

// Positions scaled for the actual 1920x1080 canvas (the originals were
// tuned for a ~960x540 reference and only ever used the top-left quarter
// of a full-HD frame) — spread across the whole width/height instead.
const GHOST_ICONS = [
  { Icon: Mail, x: 240, y: 170 },
  { Icon: Camera, x: 1660, y: 190 },
  { Icon: Music2, x: 170, y: 860 },
  { Icon: Globe, x: 1700, y: 880 },
  { Icon: BarChart3, x: 940, y: 120 },
  { Icon: MessageCircle, x: 940, y: 930 },
  { Icon: Mail, x: 110, y: 520 },
  { Icon: Globe, x: 1790, y: 520 },
]

// Icon COMPONENTS, not <Icon/> elements — see DashboardGrid.jsx for why.
const POPUPS = [
  { Icon: AlertTriangle, text: '3 posts failed to publish', tint: COLOR.orange, corner: 'top-left', beat: 'popup1' },
  { Icon: Mail, text: '47 unread emails', tint: COLOR.brand, corner: 'top-right', beat: 'popup2' },
  { Icon: RefreshCw, text: 'Re-uploading to Instagram…', tint: COLOR.purple, corner: 'bottom-left', beat: 'popup3' },
  { Icon: TrendingDown, text: 'Engagement down 12% this week', tint: COLOR.rose, corner: 'bottom-right', beat: 'popup4' },
]

export default function Scene2_Detail() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const [setupStart] = DETAIL.setup
  const ghostOpacity = ease(frame, 0, 0.6, setupStart, 12)

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLOR.canvas }}>
      {GHOST_ICONS.map(({ Icon, x, y }, i) => (
        <span key={i} style={{ position: 'absolute', left: x, top: y, opacity: ghostOpacity, color: '#CBD3DB' }}>
          <Icon size={60} strokeWidth={1.5} />
        </span>
      ))}

      {POPUPS.map((p, i) => (
        <PopupToast key={i} Icon={p.Icon} text={p.text} tint={p.tint} corner={p.corner} start={DETAIL[p.beat][0]} fps={fps} />
      ))}

      <Caption start={DETAIL.caption[0]} center>
        Ten tabs. Zero visibility. Missed deadlines.
      </Caption>
    </div>
  )
}
