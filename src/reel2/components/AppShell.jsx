import { motion } from 'framer-motion'
import { LayoutDashboard, Inbox, Settings, Sparkles, Clapperboard } from 'lucide-react'
import logo from '../../assets/logo.png'

const NAV = [
  { icon: LayoutDashboard, active: false },
  { icon: Inbox, active: false },
  { icon: Settings, active: false },
  { icon: Sparkles, active: true }, // Campaign Studio — the section this reel lives in
  { icon: Clapperboard, active: false },
]

// Persistent chrome: logo + workspace pill up top, a slim icon-only nav
// rail down the left. A full labeled sidebar (as in the real desktop app)
// doesn't fit a 480px-wide vertical canvas without crowding the content
// that actually matters here — the step content — so this keeps just
// enough of it to read as "yes, this is the real app shell."
export default function AppShell({ show }) {
  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-x-0 top-0 flex h-12 items-center justify-between border-b border-black/5 bg-white px-3">
        <img src={logo} alt="Precision by CyberGen" className="h-5 w-auto" draggable={false} />
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-ink-soft">
          CyberSecure <span className="text-ink-soft/50">·</span> Admin
        </span>
      </div>

      <div className="absolute inset-y-12 left-0 flex w-11 flex-col items-center gap-3 border-r border-black/5 bg-white pt-4">
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
