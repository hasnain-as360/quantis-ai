import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import CaptionSlot from '../components/CaptionSlot'
import { STAGE_W, STAGE_H } from '../data/constants'

const LOGO_RATIO = 446 / 1782 // logo.png's real intrinsic aspect ratio
const CENTER_W = 216
const DOCK_W = 104

// Beat 'reveal': the vaporized chaos reforms as the brand mark, centered and
// large. Beat 'order' onward: the same element (never remounted, so it
// tweens smoothly rather than cross-fading) docks to the header's top-left.
export default function SolutionReveal({ beatIndex, beat }) {
  const revealed = beatIndex >= 4
  if (!revealed) return null

  const docked = beatIndex >= 5
  const centerX = STAGE_W / 2 - CENTER_W / 2
  const centerY = STAGE_H * 0.38 - (CENTER_W * LOGO_RATIO) / 2

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {beat?.id === 'reveal' && (
        <motion.div
          className="absolute left-1/2 top-[38%] h-56 w-56 rounded-full bg-brand/25 blur-2xl"
          style={{ marginLeft: -112, marginTop: -112 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0, 0.9, 0.55] }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      )}

      <motion.div
        className="absolute left-0 top-0"
        initial={{ x: STAGE_W / 2, y: STAGE_H * 0.38, width: 0, opacity: 0 }}
        animate={
          docked
            ? { x: 18, y: 16, width: DOCK_W, opacity: 1 }
            : { x: centerX, y: centerY, width: CENTER_W, opacity: 1 }
        }
        transition={{ type: 'spring', stiffness: docked ? 190 : 130, damping: docked ? 22 : 16 }}
      >
        <img src={logo} alt="Precision by CyberGen" className="block h-auto w-full select-none" draggable={false} />
      </motion.div>

      <CaptionSlot activeKey={beat?.id === 'reveal' ? 'reveal' : null}>
        Meet <span className="text-brand">Precision.</span>
      </CaptionSlot>
    </div>
  )
}
