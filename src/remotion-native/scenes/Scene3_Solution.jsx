import { useCurrentFrame } from 'remotion'
import { COLOR, FONT } from '../theme'
import { ease, chaseStep } from '../anim'
import { SOLUTION } from '../timing'
import Shell, { SHELL_TOP, SHELL_LEFT } from '../components/Shell'
import LogoReveal from '../components/LogoReveal'
import DashboardGrid from '../components/DashboardGrid'
import Stepper from '../components/Stepper'
import Caption from '../components/Caption'
import ConfettiField from '../components/ConfettiField'
import ChannelsPanel from '../components/panels/ChannelsPanel'
import SchedulePanel from '../components/panels/SchedulePanel'
import AudiencePanel from '../components/panels/AudiencePanel'
import GeneratingPanel from '../components/panels/GeneratingPanel'
import LaunchPanel from '../components/panels/LaunchPanel'
import SuccessPanel from '../components/panels/SuccessPanel'

const STAGE_W = 1920
const STAGE_H = 1080

export default function Scene3_Solution({ fps }) {
  const frame = useCurrentFrame()
  const S = SOLUTION

  const showPivot = frame < S.dashboardIn[0]
  const showShell = frame >= S.reveal[1] - 10 // shell fades in a touch before the pivot fully clears
  const shellOpacity = ease(frame, 0, 1, S.reveal[1] - 10, 14)

  const inDashboard = frame >= S.dashboardIn[0] && frame < S.channels[0]
  const inWizard = frame >= S.channels[0]

  let view = 'channels'
  let stepFrom = 0
  let stepTo = 0
  let beatStart = S.channels[0]
  if (frame >= S.launched[0]) {
    view = 'launched'
    stepFrom = 7
    stepTo = 8
    beatStart = S.launched[0]
  } else if (frame >= S.launch[0]) {
    view = 'launch'
    stepFrom = 5
    stepTo = 7
    beatStart = S.launch[0]
  } else if (frame >= S.generating[0]) {
    view = 'generating'
    stepFrom = 2
    stepTo = 5
    beatStart = S.generating[0]
  } else if (frame >= S.audience[0]) {
    view = 'audience'
    stepFrom = 1
    stepTo = 2
    beatStart = S.audience[0]
  } else if (frame >= S.schedule[0]) {
    view = 'schedule'
    stepFrom = 0
    stepTo = 1
    beatStart = S.schedule[0]
  }

  const displayStep = chaseStep(frame, beatStart, stepFrom, stepTo, 4)
  const localFrame = frame - beatStart
  const genProgress = Math.min(100, ease(frame, 0, 100, S.generating[0], S.generating[1] - S.generating[0]))

  const dashboardCaption = inDashboard
  const wizardCaption = inWizard

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLOR.canvas }}>
      {showPivot && <LogoReveal start={S.reveal[0]} topLabel="Meet" />}
      {showShell && <Shell opacity={shellOpacity} />}

      {inWizard && <ConfettiField start={S.launched[0]} width={STAGE_W} height={STAGE_H} />}

      {showShell && (
        // bottom:230 (not 0) reserves real space for the caption below —
        // recomputed for the caption's larger 36px font (was tuned for the
        // smaller size and started clipping again the moment that grew).
        <div style={{ position: 'absolute', top: SHELL_TOP, bottom: 230, left: SHELL_LEFT, right: 0, overflow: 'hidden' }}>
          {inDashboard && <DashboardGrid start={S.dashboardIn[0]} />}
          {inWizard && (
            // No more artificial max-width+scale-down — this fills a real
            // fraction of a 1920-wide canvas instead of floating as a tiny
            // island in a sea of white. Vertically centered in the space
            // above the caption rather than pinned to the top.
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
              <div style={{ width: '100%', maxWidth: 980 }}>
                <Stepper displayStep={displayStep} />
                <div style={{ marginTop: 28 }}>
                  {view === 'channels' && <ChannelsPanel start={S.channels[0]} />}
                  {view === 'schedule' && <SchedulePanel />}
                  {view === 'audience' && <AudiencePanel />}
                  {view === 'generating' && <GeneratingPanel localFrame={localFrame} progress={genProgress} />}
                  {view === 'launch' && <LaunchPanel />}
                  {view === 'launched' && <SuccessPanel localFrame={localFrame} fps={fps} />}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {dashboardCaption && (
        <Caption start={S.dashboardIn[0]} wide>
          Your entire command center. One dashboard.
        </Caption>
      )}
      {wizardCaption && (
        <Caption start={S.channels[0]} wide>
          From channels to launch &mdash; Precision runs the whole journey.
        </Caption>
      )}
    </div>
  )
}
