import Background from './Background'
import ChaosScene from '../scenes/ChaosScene'
import SolutionReveal from '../scenes/SolutionReveal'
import DashboardReveal from '../scenes/DashboardReveal'

// The actual four-layer reel, with no opinion about its own size or
// position — callers (the interactive Stage preview, the chrome-less
// RecordExport renderer) provide a sized, `position: relative`,
// `overflow: hidden` container. Keeping this logic in one place means the
// preview you tune against and the file you export are never able to drift
// out of sync with each other.
export default function ReelCanvas({ index, beat }) {
  return (
    <>
      <Background />
      <ChaosScene beatIndex={index} beat={beat} />
      <SolutionReveal beatIndex={index} beat={beat} />
      <DashboardReveal beatIndex={index} beat={beat} />
    </>
  )
}
