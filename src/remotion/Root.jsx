import { Composition } from 'remotion'
import { REELS } from '../reels'
import ReelComposition from './ReelComposition'
import PrecisionExplainerNative from '../remotion-native/Video'
import { TOTAL_FRAMES as NATIVE_FRAMES } from '../remotion-native/timing'

const FPS = 30

// One <Composition> per entry in the shared reel registry (src/reels.js) —
// add a reel there and it shows up here automatically. `id` is what you
// pass to `remotion render`/`remotion studio` to pick a reel.
//
// `precision-explainer-native` is separate from this: it's the pure-Remotion
// rebuild (src/remotion-native/) with no Vite/Tailwind/Framer Motion in its
// tree at all, kept alongside the original rather than replacing it.
export default function RemotionRoot() {
  return (
    <>
      {Object.entries(REELS).map(([id, reel]) => {
        const totalMs = reel.beats.reduce((sum, b) => sum + b.duration, 0)
        return (
          <Composition
            key={id}
            id={id}
            component={ReelComposition}
            durationInFrames={Math.round((totalMs / 1000) * FPS)}
            fps={FPS}
            width={reel.exportW}
            height={reel.exportH}
            defaultProps={{ reelId: id }}
          />
        )
      })}
      <Composition
        id="precision-explainer-native"
        component={PrecisionExplainerNative}
        durationInFrames={NATIVE_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  )
}
