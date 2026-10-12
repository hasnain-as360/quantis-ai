import { AnimatePresence } from 'framer-motion'
import Stepper from '../../reel2/components/Stepper'
import ChannelsStep from './ChannelsStep'
import ScheduleStep from './ScheduleStep'
import AudienceStep from './AudienceStep'
import GeneratingPanel from '../../reel2/components/GeneratingPanel'
import LaunchPanel from '../../reel2/components/LaunchPanel'
import SuccessPanel from '../../reel2/components/SuccessPanel'
import { IDX } from '../beats'

// The 8-step wizard from ss-video.mp4, reused verbatim (Stepper component
// and its STEPS list both come from reel 2), walking further into the flow
// than reel 2 did: Channels -> Schedule -> Audience -> (fast-forward) ->
// Create/Generating -> Launch -> Campaign Launched.
export default function WizardArea({ index, onStates, genProgress }) {
  let step = 0
  let view = 'channels'
  if (index >= IDX['s3-wizard-launched']) {
    step = 8 // one past Launch: Stepper's own "all steps complete" state
    view = 'launched'
  } else if (index >= IDX['s3-wizard-launch']) {
    step = 7
    view = 'launch'
  } else if (index >= IDX['s3-wizard-generating']) {
    step = 5
    view = 'generating'
  } else if (index >= IDX['s3-wizard-audience']) {
    step = 2
    view = 'audience'
  } else if (index >= IDX['s3-wizard-schedule']) {
    step = 1
    view = 'schedule'
  }

  return (
    // LaunchPanel/GeneratingPanel were sized for reel 2's taller portrait
    // card; scaled down here (uniformly, so nothing needs re-tuning by
    // hand) to reliably clear the caption band in this shorter landscape
    // content area. transformOrigin "top" keeps growth/shrink pointing
    // down, away from the stepper above it.
    <div className="mx-auto w-full max-w-[560px] origin-top scale-[0.82]">
      <Stepper activeIndex={step} revealed />
      <div className="mt-3">
        <AnimatePresence mode="wait">
          {view === 'channels' && <ChannelsStep key="c" onStates={onStates} />}
          {view === 'schedule' && <ScheduleStep key="s" />}
          {view === 'audience' && <AudienceStep key="a" />}
          {view === 'generating' && <GeneratingPanel key="g" progress={genProgress} />}
          {view === 'launch' && <LaunchPanel key="l" launching={false} />}
          {view === 'launched' && <SuccessPanel key="ln" />}
        </AnimatePresence>
      </div>
    </div>
  )
}
