import LogoMoment from '../components/LogoMoment'
import Shell3 from '../components/Shell3'
import DashboardMini from '../components/DashboardMini'
import WizardArea from '../components/WizardArea'
import CaptionSlot from '../../components/CaptionSlot'
import Confetti from '../../reel2/components/Confetti'
import { IDX } from '../beats'
import { STAGE_W_L, STAGE_H_L } from '../../data/constants'

export default function SolutionScene({ index }) {
  const showPivot = index === IDX['s3-reveal']
  const showShell = index > IDX['s3-reveal']
  const dashboardActive = index >= IDX['s3-dashboard-in']
  const view = index >= IDX['s3-wizard-channels'] ? 'wizard' : 'dashboard'

  const onStates = { email: true, newsletter: true, tiktok: true, instagram: true }
  let genProgress = 0
  if (index === IDX['s3-wizard-generating']) genProgress = 82
  else if (index > IDX['s3-wizard-generating']) genProgress = 100

  const dashboardCaption = index >= IDX['s3-dashboard-in'] && index < IDX['s3-wizard-channels']
  const wizardCaption = index >= IDX['s3-wizard-channels']
  const launched = index >= IDX['s3-wizard-launched']

  return (
    <div className="absolute inset-0">
      <LogoMoment show={showPivot} variant="pivot" topLabel="Meet" />
      {/* Confetti is a sibling of the clipped wizard content area (not a
          child of it) so it can burst across the full canvas edge-to-edge,
          matching the reference — nested inside that overflow-hidden box it
          would get clipped to the narrow content column instead. Reused
          from reel 2 with this reel's own (landscape) stage size passed in. */}
      <Confetti show={launched} stageW={STAGE_W_L} stageH={STAGE_H_L} />
      <Shell3 show={showShell} />
      <Shell3 show={showShell} />

      {/* bottom-28 (not bottom-0) reserves a clear band for the caption
          below — see Caption's `scrim` doc comment; this is the same
          collision class as reel 1/2's dashboard captions. items-start
          (not -center) on the wizard wrapper means a too-tall panel
          overflows downward only, in a predictable direction, rather than
          spilling equally off both edges of the clipped box. */}
      {showShell && (
        <div className="absolute inset-x-0 top-10 bottom-28 left-12 overflow-hidden">
          {view === 'dashboard' ? (
            <DashboardMini active={dashboardActive} />
          ) : (
            <div className="flex h-full items-start justify-center px-8 pt-3">
              <WizardArea index={index} onStates={onStates} genProgress={genProgress} />
            </div>
          )}
        </div>
      )}

      <CaptionSlot activeKey={dashboardCaption ? 's3-dash-cap' : null} scrim>
        Your entire command center. One dashboard.
      </CaptionSlot>
      <CaptionSlot activeKey={wizardCaption ? 's3-wiz-cap' : null} scrim>
        From channels to launch — Precision runs the whole journey.
      </CaptionSlot>
    </div>
  )
}
