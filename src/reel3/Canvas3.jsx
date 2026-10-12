import Background2 from '../reel2/components/Background2'
import ProblemScene from './scenes/ProblemScene'
import DetailScene from './scenes/DetailScene'
import SolutionScene from './scenes/SolutionScene'
import FeaturesScene from './scenes/FeaturesScene'
import OutroScene from './scenes/OutroScene'

// Top-level orchestrator for reel 3. Each scene is mounted only for its own
// window (matching `beat.scene`) rather than reel 1/2's "always-mounted
// siblings" pattern — reel 3's five scenes don't hand off state to each
// other the way reel 2's chaos->dashboard did, so there's nothing to gain
// from keeping earlier scenes around once their window has passed.
export default function Canvas3({ index, beat }) {
  const scene = beat?.scene

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Background2 />
      {scene === 'problem' && <ProblemScene index={index} />}
      {scene === 'detail' && <DetailScene index={index} />}
      {scene === 'solution' && <SolutionScene index={index} />}
      {scene === 'features' && <FeaturesScene index={index} />}
      {scene === 'outro' && <OutroScene />}
    </div>
  )
}
