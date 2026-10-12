import { motion } from 'framer-motion'
import ToggleRow from '../../reel2/components/ToggleRow'
import { CHANNELS } from '../../reel2/data/channels'

export default function ChannelsStep({ onStates }) {
  return (
    <motion.div
      key="channels"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2 gap-2"
    >
      {CHANNELS.map((c, i) => (
        <ToggleRow key={c.id} channel={c} on={!!onStates[c.id]} index={i} />
      ))}
    </motion.div>
  )
}
