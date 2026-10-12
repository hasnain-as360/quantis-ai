import { Camera, Mail, FileText, Globe, BarChart3, CalendarDays, MessageCircle, Megaphone } from 'lucide-react'

function mulberry32(seed) {
  let a = seed
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Each card is deliberately styled like a DIFFERENT product (own corner
// radius, own accent, own "kind" of content) rather than a uniform set —
// the brief's "mismatched UI cards representing different platforms", not
// a single reused template.
const KINDS = [
  { label: 'Social Post', icon: Camera, accent: '#d6336c', radius: 22, kind: 'social' },
  { label: 'Email Campaign', icon: Mail, accent: '#2b91e5', radius: 12, kind: 'list' },
  { label: 'Blog Editor', icon: FileText, accent: '#17a673', radius: 8, kind: 'lines' },
  { label: 'Website CMS', icon: Globe, accent: '#7c5cff', radius: 16, kind: 'browser' },
  { label: 'Analytics', icon: BarChart3, accent: '#e8892b', radius: 12, kind: 'chart' },
  { label: 'Scheduler', icon: CalendarDays, accent: '#0891b2', radius: 18, kind: 'calendar' },
  { label: 'Inbox', icon: MessageCircle, accent: '#be185d', radius: 10, kind: 'list' },
  { label: 'Ad Manager', icon: Megaphone, accent: '#4338ca', radius: 8, kind: 'lines' },
]

const COUNT = 13
const rand = mulberry32(9142026)

function generate() {
  const items = []
  for (let i = 0; i < COUNT; i++) {
    const k = KINDS[i % KINDS.length]
    const angle = rand() * Math.PI * 2
    const radius = 70 + rand() * 220
    items.push({
      id: `c${i}`,
      ...k,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.82,
      rotate: -22 + rand() * 44,
      scale: 0.62 + rand() * 0.34,
      delay: rand() * 900,
      z: Math.round(rand() * 10),
    })
  }
  return items
}

export const CHAOS_CARDS = generate()
