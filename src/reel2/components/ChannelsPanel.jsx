import { motion } from 'framer-motion'
import ToggleRow from './ToggleRow'
import { CHANNELS } from '../data/channels'

export default function ChannelsPanel({ onStates }) {
  return (
    <motion.div
      key="channels"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <p className="mb-2 text-[10px] font-semibold tracking-wide text-ink-soft/80 uppercase">Select your channels</p>
      {CHANNELS.map((c, i) => (
        <ToggleRow key={c.id} channel={c} on={!!onStates[c.id]} index={i} />
      ))}
    </motion.div>
  )
}
