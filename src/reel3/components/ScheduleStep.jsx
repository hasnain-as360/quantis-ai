import { motion } from 'framer-motion'
import { Clock, CalendarDays } from 'lucide-react'

// Matches the reference recording's "Plan Your Campaign Schedule" step:
// duration pills (Post Now / 1 Week / 2 Weeks) with one selected, plus a
// start-date field.
export default function ScheduleStep({ selected = '1 Week' }) {
  const options = ['Post Now', '1 Week', '2 Weeks']
  return (
    <motion.div
      key="schedule"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-200/80 bg-white/80 p-4"
    >
      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
        <Clock className="h-4 w-4 text-brand" /> Campaign Duration
      </p>
      <p className="mt-0.5 text-[10.5px] text-ink-soft">How long should your campaign run?</p>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {options.map((o) => {
          const isSel = o === selected
          return (
            <motion.span
              key={o}
              className="rounded-lg py-2 text-center text-[11.5px] font-semibold"
              animate={{
                backgroundColor: isSel ? '#2B91E5' : '#FFFFFF',
                color: isSel ? '#FFFFFF' : '#0B0D12',
                borderColor: isSel ? '#2B91E5' : '#D8DDE5',
              }}
              transition={{ duration: 0.25 }}
              style={{ borderWidth: 1, borderStyle: 'solid' }}
            >
              {o}
            </motion.span>
          )
        })}
      </div>

      <p className="mt-3 text-[10.5px] font-medium text-ink-soft">Start Date</p>
      <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
        <CalendarDays className="h-3.5 w-3.5 text-ink-soft" />
        <span className="text-[11.5px] font-medium text-ink">Sep 15, 2026</span>
      </div>
    </motion.div>
  )
}
