import { motion } from 'framer-motion'
import { Rocket, CheckCircle2, Mail } from 'lucide-react'

// "Campaign Launched!" — matches the reference's gradient headline over the
// rocket + checkmark icon stack, with the confetti burst (rendered by the
// sibling <Confetti/>) happening around it.
export default function SuccessPanel() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center py-3 text-center"
    >
      <motion.span
        className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_6px_16px_rgba(43,145,229,0.45)]"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <Rocket className="h-5 w-5" strokeWidth={2} />
      </motion.span>

      <motion.span
        className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent-green text-accent-green"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 14 }}
      >
        <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="bg-gradient-to-r from-brand via-accent-purple to-rose-500 bg-clip-text text-[19px] font-extrabold text-transparent"
      >
        Campaign Launched!
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.35 }}
        className="mt-1 text-[11px] text-ink-soft"
      >
        Your campaign will start sending to 51 contacts now
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-3 flex flex-col items-center gap-1 rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-brand">
          <Mail className="h-3.5 w-3.5" />
        </span>
        <span className="text-[10.5px] font-semibold text-ink">Email</span>
        <span className="text-[9.5px] text-ink-soft">Sending</span>
      </motion.div>
    </motion.div>
  )
}
