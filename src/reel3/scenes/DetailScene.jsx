import { motion } from 'framer-motion'
import { Mail, Camera, Music2, Globe, BarChart3, MessageCircle } from 'lucide-react'
import NotificationPopup from '../components/NotificationPopup'
import CaptionSlot from '../../components/CaptionSlot'
import { POPUPS } from '../data/popups'
import { IDX } from '../beats'

// A handful of faint, static tool glyphs — just enough background texture
// to read as "many separate apps" without competing with the popups, which
// are the scene's actual subject.
const GHOST_ICONS = [
  { Icon: Mail, x: 120, y: 90 },
  { Icon: Camera, x: 840, y: 100 },
  { Icon: Music2, x: 90, y: 430 },
  { Icon: Globe, x: 860, y: 440 },
  { Icon: BarChart3, x: 480, y: 70 },
  { Icon: MessageCircle, x: 480, y: 470 },
]

export default function DetailScene({ index }) {
  const setupIndex = IDX['s2-setup']
  const active = index >= setupIndex

  return (
    <div className="absolute inset-0 z-20">
      {GHOST_ICONS.map(({ Icon, x, y }, i) => (
        <motion.span
          key={i}
          className="absolute text-slate-300"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: active ? 0.55 : 0, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <Icon className="h-9 w-9" strokeWidth={1.5} />
        </motion.span>
      ))}

      {POPUPS.map((p, i) => (
        <NotificationPopup key={p.id} def={p} show={index >= IDX[`s2-popup${i + 1}`]} />
      ))}

      <CaptionSlot activeKey={index >= IDX['s2-caption'] ? 's2-caption' : null} scrim center>
        Ten tabs. Zero visibility. Missed deadlines.
      </CaptionSlot>
    </div>
  )
}
