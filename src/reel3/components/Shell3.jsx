import { motion } from 'framer-motion'
import { LayoutDashboard, Inbox, Settings, Sparkles, Clapperboard, CalendarDays } from 'lucide-react'
import logo from '../../assets/logo.png'

const NAV = [
  { icon: LayoutDashboard, active: false },
  { icon: Inbox, active: false },
  { icon: Settings, active: false },
  { icon: Sparkles, active: true },
  { icon: Clapperboard, active: false },
  { icon: CalendarDays, active: false },
]

// The landscape app chrome for Scene 3 — wider canvas than reel 2's portrait
// shell affords a slightly roomier sidebar, but it's still an icon-only
// rail rather than the real desktop's labeled one; the wizard/dashboard
// content is what this scene is actually about.
export default function Shell3({ show }) {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-black/5 bg-white px-4">
        <img src={logo} alt="Precision by CyberGen" className="h-4 w-auto" draggable={false} />
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9.5px] font-medium text-ink-soft">
          CyberSecure <span className="text-ink-soft/50">·</span> Admin
        </span>
      </div>

      <div className="absolute inset-y-10 left-0 flex w-12 flex-col items-center gap-3 border-r border-black/5 bg-white pt-4">
        {NAV.map(({ icon: Icon, active }, i) => (
          <span
            key={i}
            className={`flex h-7 w-7 items-center justify-center rounded-lg ${active ? 'bg-brand/10 text-brand' : 'text-ink-soft/70'}`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        ))}
      </div>
    </motion.div>
  )
}
