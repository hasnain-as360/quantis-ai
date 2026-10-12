import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useVideoConfig } from 'remotion'
import { loadFont } from '@remotion/google-fonts/SpaceGrotesk'
import { SCENE_FRAMES, TOTAL_FRAMES } from './timing'
import Scene1_Problem from './scenes/Scene1_Problem'
import Scene2_Detail from './scenes/Scene2_Detail'
import Scene3_Solution from './scenes/Scene3_Solution'
import Scene4_Features from './scenes/Scene4_Features'
import Scene5_Outro from './scenes/Scene5_Outro'

// @remotion/google-fonts loads (and, crucially, *waits for* via
// delayRender/continueRender) the font before any frame is captured — a
// plain <link> tag has no such guarantee under headless rendering and can
// silently fall back to a system font on some frames and not others.
loadFont()

// Pure Remotion composition: every scene is a <Sequence> at an exact frame
// offset, no Vite, no Tailwind, no Framer Motion anywhere in this tree.
// Same script/copy/scene flow/durations as the Tailwind+Framer build.
export default function PrecisionExplainerNative() {
  const { fps } = useVideoConfig()
  let cursor = 0
  const at = (key) => {
    const from = cursor
    cursor += SCENE_FRAMES[key]
    return from
  }

  const problemFrom = at('problem')
  const detailFrom = at('detail')
  const solutionFrom = at('solution')
  const featuresFrom = at('features')
  const outroFrom = at('outro')

  return (
    <AbsoluteFill style={{ background: '#F8F9FA' }}>
      <Audio
        src={staticFile('audio/bgm-aylex-positive-direction.m4a')}
        volume={(f) =>
          interpolate(f, [0, 30, TOTAL_FRAMES - 45, TOTAL_FRAMES], [0, 0.35, 0.35, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />
      <Sequence from={problemFrom} durationInFrames={SCENE_FRAMES.problem}>
        <Scene1_Problem />
      </Sequence>
      <Sequence from={detailFrom} durationInFrames={SCENE_FRAMES.detail}>
        <Scene2_Detail />
      </Sequence>
      <Sequence from={solutionFrom} durationInFrames={SCENE_FRAMES.solution}>
        <Scene3_Solution fps={fps} />
      </Sequence>
      <Sequence from={featuresFrom} durationInFrames={SCENE_FRAMES.features}>
        <Scene4_Features />
      </Sequence>
      <Sequence from={outroFrom} durationInFrames={SCENE_FRAMES.outro}>
        <Scene5_Outro />
      </Sequence>
    </AbsoluteFill>
  )
}
