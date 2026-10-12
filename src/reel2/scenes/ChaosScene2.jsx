import { AnimatePresence } from 'framer-motion'
import ChaosCard from '../components/ChaosCard'
import KineticCaption from '../components/KineticCaption'
import { CHAOS_CARDS } from '../data/chaosCards'
import { IDX } from '../beats'

// Scene 1 (0-4000ms): a dozen mismatched "different platform" cards
// tumbling into a cluttered stack, with the problem statement building
// word-by-word across two phrases. Stays mounted through the start of
// Scene 2 so the cards can play their "snap away" exit.
export default function ChaosScene2({ index }) {
  const clearing = index >= IDX.turnSnap

  return (
    <div className="absolute inset-0 z-20">
      {CHAOS_CARDS.map((c) => (
        <ChaosCard key={c.id} def={c} phase={clearing ? 'clearing' : 'chaos'} />
      ))}

      <AnimatePresence mode="wait">
        {index === IDX.chaosPhrase1 && (
          <KineticCaption
            key="p1"
            text="Managing your social media, emails, blogs, and website content across different platforms?"
            top="30%"
          />
        )}
        {index === IDX.chaosPhrase2 && (
          <KineticCaption key="p2" text="Switching between tools can get messy and time-consuming." top="30%" />
        )}
      </AnimatePresence>
    </div>
  )
}
