import { Mail, Newspaper, Music2, Camera } from 'lucide-react'
import ToggleRow from '../ToggleRow'

// Icon COMPONENTS, not <Icon/> elements — see DashboardGrid.jsx for why.
const CHANNELS = [
  { Icon: Mail, label: 'Email Campaign', sub: 'Send emails to your contact lists', tint: 'brand' },
  { Icon: Newspaper, label: 'Newsletter', sub: 'Magazine-style recurring newsletters', tint: 'purple' },
  { Icon: Music2, label: 'TikTok', sub: 'Short-form vertical video posts', tint: 'inkBlack' },
  { Icon: Camera, label: 'Instagram', sub: 'Images and carousel posts', tint: 'instagram' },
]

export default function ChannelsPanel({ start }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      {CHANNELS.map((c, i) => (
        <ToggleRow key={c.label} {...c} on index={i} start={start} />
      ))}
    </div>
  )
}
