import { useVideoConfig } from 'remotion'
import { Send, CheckCircle2, Eye, MousePointerClick, Users, Globe } from 'lucide-react'
import MetricTile from './MetricTile'

// Same real numbers as SS 2/Screenshot (791).png, reused across every reel
// in this project.
// Icon COMPONENTS (not <Icon/> elements) — kept as plain references so
// nothing here creates a JSX element at module-evaluation time, only when
// MetricTile actually renders one.
const METRICS = [
  { Icon: Send, label: 'Emails Sent', value: '28,633', delta: '+37.6% vs prev', deltaUp: true, tint: 'brand' },
  { Icon: CheckCircle2, label: 'Delivery Rate', value: '67.3%', delta: '+0.5% vs prev', deltaUp: true, tint: 'green' },
  { Icon: Eye, label: 'Open Rate', value: '9.1%', delta: '+47.2% vs prev', deltaUp: true, tint: 'brand' },
  { Icon: MousePointerClick, label: 'Click Rate', value: '6.8%', delta: '+45.6% vs prev', deltaUp: true, tint: 'purple' },
  { Icon: Users, label: 'Leads Generated', value: '0', delta: '0.0% vs prev', deltaUp: false, tint: 'green' },
  { Icon: Globe, label: 'Social Reach', value: '0', delta: '0.0% vs prev', deltaUp: false, tint: 'orange' },
]

export default function DashboardGrid({ start }) {
  const { fps } = useVideoConfig()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24, height: '100%', padding: 32 }}>
      {METRICS.map((m, i) => (
        <MetricTile key={m.label} {...m} index={i} start={start} fps={fps} />
      ))}
    </div>
  )
}
