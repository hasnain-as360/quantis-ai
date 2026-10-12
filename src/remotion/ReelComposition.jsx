import { AbsoluteFill } from 'remotion'
import { useRemotionBeat } from './useRemotionBeat'
import { REELS } from '../reels'

// Renders one reel's Canvas at a given frame. Reuses the exact same
// "author at stageW x stageH, scale up with CSS transform" approach as
// components/RecordExport.jsx, so nothing about how the scenes are built
// needs to change to render under Remotion instead of Playwright.
//
// Takes a plain `reelId` string rather than the reel object itself:
// Composition defaultProps get JSON-serialized when handed to Remotion's
// render worker, and a reel object holds a React component reference
// (Canvas) that can't survive that round-trip. Looking the reel up from the
// registry here, inside the component, sidesteps that entirely.
export default function ReelComposition({ reelId }) {
  const { beats, Canvas, stageW, stageH, exportScale } = REELS[reelId]
  const { index, beat } = useRemotionBeat(beats)

  return (
    <AbsoluteFill style={{ background: '#F8F9FA' }}>
      <div
        style={{
          width: stageW,
          height: stageH,
          position: 'relative',
          overflow: 'hidden',
          transform: `scale(${exportScale})`,
          transformOrigin: 'top left',
        }}
      >
        <Canvas index={index} beat={beat} />
      </div>
    </AbsoluteFill>
  )
}
