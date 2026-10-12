import {
  Mail,
  Video,
  Camera,
  MessageCircle,
  BarChart3,
  Megaphone,
  Image as ImageIcon,
  CalendarDays,
  Send,
  PieChart,
} from 'lucide-react'

// Deterministic PRNG (mulberry32) so the scattered field is stable across
// re-renders and hot-reloads instead of reshuffling every time React
// re-evaluates this module.
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

const ICONS = [Mail, Video, Camera, MessageCircle, BarChart3, Megaphone, ImageIcon, CalendarDays, Send, PieChart]
const TINT_KEYS = ['brand', 'purple', 'green', 'orange', 'cyan']
const KINDS = ['icon', 'chart', 'list']

const COUNT = 26 // tune density here
const rand = mulberry32(20240914)

function generate() {
  const items = []
  for (let i = 0; i < COUNT; i++) {
    // Windows are bucketed into the 4 "problem" beats (0-3) so the field
    // fills in progressively rather than dumping all 26 at once.
    const beat = i < 7 ? 0 : i < 14 ? 1 : i < 20 ? 2 : 3
    const angle = rand() * Math.PI * 2
    const radius = 90 + rand() * 210
    items.push({
      id: `w${i}`,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.85,
      rotate: -26 + rand() * 52,
      scale: 0.55 + rand() * 0.35,
      beat,
      staggerDelay: rand() * 500,
      icon: ICONS[i % ICONS.length],
      tint: TINT_KEYS[i % TINT_KEYS.length],
      kind: KINDS[i % KINDS.length],
      z: Math.round(rand() * 10),
    })
  }
  return items
}

export const WINDOWS = generate()
