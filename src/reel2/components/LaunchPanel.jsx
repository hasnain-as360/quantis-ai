import { motion } from 'framer-motion'
import { Rocket, Users, Mail, CalendarClock, CheckCircle2 } from 'lucide-react'

// "Ready to Launch!" — rocket icon, stat chips, schedule/audience summary,
// a checklist, and the CTA the reel's cursor is about to click. Layout is
// deliberately fixed-height so the CTA sits at a known, stable position for
// the cursor animation in ClimaxScene.
export default function LaunchPanel({ launching }) {
  return (
    <motion.div
      key="launch"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center py-1 text-center">
        <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_6px_16px_rgba(43,145,229,0.45)]">
          <Rocket className="h-5 w-5" strokeWidth={2} />
        </span>
        <p className="text-[15px] font-bold text-ink">Ready to Launch!</p>
        <p className="mt-0.5 text-[11px] text-ink-soft">Your campaign is configured and ready to go</p>
      </div>

      <div className="mt-3 flex gap-4 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px]">
          <Users className="h-3.5 w-3.5 text-brand" /> <b className="text-ink">51</b>
          <span className="text-ink-soft">recipients</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px]">
          <Mail className="h-3.5 w-3.5 text-brand" /> <b className="text-ink">1</b>
          <span className="text-ink-soft">email</span>
        </span>
      </div>

      <div className="mt-2 rounded-xl border border-brand/15 bg-brand/[0.06] px-3 py-2.5">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
          <CalendarClock className="h-3.5 w-3.5 text-brand" /> Campaign Schedule
        </p>
        <p className="mt-1 text-[10.5px] text-ink-soft">Sep 14 &ndash; Sep 14, 2026 &middot; one-time send</p>
      </div>

      <ul className="mt-2 space-y-1 rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2.5">
        {['1 email will be scheduled for 51 contacts', 'First email sends on Sep 14 at 9:00 AM'].map((line) => (
          <li key={line} className="flex items-start gap-1.5 text-[10.5px] text-ink-soft">
            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-accent-green" /> {line}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex justify-end">
        <motion.span
          id="launch-cta"
          className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[12px] font-semibold text-white shadow-[0_6px_16px_rgba(43,145,229,0.4)]"
          animate={launching ? { scale: [1, 0.94, 1], backgroundColor: ['#2B91E5', '#1C6FB8', '#2B91E5'] } : {}}
          transition={{ duration: 0.35 }}
        >
          <Rocket className="h-3.5 w-3.5" /> {launching ? 'Launching…' : 'Launch Campaign'}
        </motion.span>
      </div>
    </motion.div>
  )
}
