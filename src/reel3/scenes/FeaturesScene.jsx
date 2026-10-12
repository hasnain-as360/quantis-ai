import { motion, AnimatePresence } from 'framer-motion'
import FeatureDemo from '../components/FeatureDemo'
import { FEATURES } from '../data/features'
import { TINTS3 } from '../tints'
import { IDX } from '../beats'

const BEAT_IDS = ['s4-feature1', 's4-feature2', 's4-feature3', 's4-feature4']

// Scene 4: an interactive list on the left (each feature collapses to a
// title once passed, expands with its description while active, stays
// dimmed until reached), with that feature's own mini-demo on the right —
// "breaking down each item, then the next feature the same way."
export default function FeaturesScene({ index }) {
  const activeI = BEAT_IDS.findIndex((id) => index === IDX[id])
  const reachedI = BEAT_IDS.reduce((acc, id, i) => (index >= IDX[id] ? i : acc), 0)
  const active = FEATURES[activeI] ?? FEATURES[reachedI]

  return (
    <div className="absolute inset-0 z-20 flex items-center gap-10 px-16">
      <div className="flex w-[380px] shrink-0 flex-col gap-2">
        <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-ink-soft/70 uppercase">
          Core Features
        </p>
        {FEATURES.map((f, i) => {
          const isActive = i === activeI || (activeI === -1 && i === reachedI)
          const reached = i <= reachedI
          const t = TINTS3[f.tint] ?? TINTS3.brand
          return (
            <motion.div
              key={f.id}
              className="rounded-xl border px-3.5 py-3"
              animate={{
                opacity: reached ? 1 : 0.35,
                borderColor: isActive ? '#2B91E5' : '#E7EAEE',
                backgroundColor: isActive ? '#EAF4FD' : '#FFFFFF',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${t.chip}`}>
                  <f.icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <p className="text-[14px] font-bold tracking-tight text-ink">{f.title}</p>
              </div>
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 overflow-hidden pl-[42px] text-[11.5px] leading-snug text-ink-soft"
                  >
                    {f.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureDemo demo={active.demo} tint={active.tint} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
