import { Mail, Newspaper, Music2, Camera } from 'lucide-react'

// The four toggles the brief calls out by name for Scene 3. Colors/icon
// choices follow the reference recording's own channel-row language (a
// colored icon chip + title + subtitle + switch).
export const CHANNELS = [
  { id: 'email', label: 'Email Campaign', sub: 'Send emails to your contact lists', icon: Mail, tint: 'brand' },
  { id: 'newsletter', label: 'Newsletter', sub: 'Magazine-style recurring newsletters', icon: Newspaper, tint: 'purple' },
  { id: 'tiktok', label: 'TikTok', sub: 'Short-form vertical video posts', icon: Music2, tint: 'inkBlack' },
  { id: 'instagram', label: 'Instagram', sub: 'Images and carousel posts', icon: Camera, tint: 'instagram' },
]
