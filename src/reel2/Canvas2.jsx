import { AnimatePresence } from 'framer-motion'
import Background2 from './components/Background2'
import AppShell from './components/AppShell'
import Stepper from './components/Stepper'
import ChannelsPanel from './components/ChannelsPanel'
import GeneratingPanel from './components/GeneratingPanel'
import LaunchPanel from './components/LaunchPanel'
import SuccessPanel from './components/SuccessPanel'
import Cursor from './components/Cursor'
import Confetti from './components/Confetti'
import KineticCaption from './components/KineticCaption'
import ChaosScene2 from './scenes/ChaosScene2'
import { IDX } from './beats'
import { STAGE_W, STAGE_H } from '../data/constants'

// On-screen position of LaunchPanel's #launch-cta button, in stage pixels —
// measured via getBoundingClientRect() against the real rendered layout
// (not guessed), since Cursor needs a concrete pixel target and the button
// sits inside normal document flow, not fixed coordinates.
const CTA_X = 373
const CTA_Y = 451

export default function Canvas2({ index, beat }) {
  const sceneId = beat?.scene

  const showShell = index >= IDX.turnSnap
  const showPanelCard = index >= IDX.turnPanel
  const stepperRevealed = index >= IDX.turnStepper

  let stepperActive = 0
  if (index >= IDX.climaxSuccess) stepperActive = 8 // one past Launch: all 8 nodes read as done
  else if (index >= IDX.climaxStepperAdvance) stepperActive = 7 // Launch
  else if (index >= IDX.flowStepperAdvance) stepperActive = 5 // Create

  const onStates = {
    email: index >= IDX.flowToggleEmail,
    newsletter: index >= IDX.flowToggleNewsletter,
    tiktok: index >= IDX.flowToggleTiktok,
    instagram: index >= IDX.flowToggleInstagram,
  }

  let panel = 'channels'
  if (index >= IDX.climaxSuccess) panel = 'success'
  else if (index >= IDX.climaxReady) panel = 'launch'
  else if (index >= IDX.flowGenerating) panel = 'generating'

  let genProgress = 0
  if (index === IDX.flowGenerating) genProgress = 78
  else if (index >= IDX.flowGeneratingDone) genProgress = 100

  const showCursor = index >= IDX.climaxCursor && index < IDX.climaxSuccess
  const clicked = index >= IDX.climaxClick
  const launching = index === IDX.climaxClick
  const confettiOn = index >= IDX.climaxSuccess

  return (
    <div className="absolute inset-0">
      <Background2 />
      <ChaosScene2 index={index} />
      <AppShell show={showShell} />

      {showShell && (
        <div
          className="absolute inset-x-3 z-20 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-opacity duration-300"
          style={{ top: 60, height: 520, opacity: stepperRevealed ? 1 : 0 }}
        >
          <Stepper activeIndex={stepperActive} revealed={stepperRevealed} />
          {/* Card and stepper appear together; the step CONTENT fades in a
              beat later so the stepper cascade has a moment to read on its
              own first, matching the reference's own sequencing. */}
          <div className="mt-3 transition-opacity duration-300" style={{ opacity: showPanelCard ? 1 : 0 }}>
            <AnimatePresence mode="wait">
              {panel === 'channels' && <ChannelsPanel key="c" onStates={onStates} />}
              {panel === 'generating' && <GeneratingPanel key="g" progress={genProgress} />}
              {panel === 'launch' && <LaunchPanel key="l" launching={launching} />}
              {panel === 'success' && <SuccessPanel key="s" />}
            </AnimatePresence>
          </div>
        </div>
      )}

      <Cursor x={CTA_X} y={CTA_Y} clicked={clicked} show={showCursor} />
      <Confetti show={confettiOn} />

      <AnimatePresence mode="wait">
        {sceneId === 'turn' && (
          <KineticCaption
            key="turn"
            text="Meet PRECISION — one platform to create, manage, and publish it all."
            emphasize="PRECISION"
            top="70%"
          />
        )}
        {sceneId === 'flow' && (
          <KineticCaption
            key="flow"
            text="From social media posts and email campaigns to blogs and website content..."
            top="70%"
          />
        )}
        {sceneId === 'climax' && (
          <KineticCaption
            key="climax"
            text="...PRECISION brings everything together in one place."
            emphasize="PRECISION"
            top="70%"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
