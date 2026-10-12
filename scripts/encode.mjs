// Transcodes the raw Playwright capture (VP8/WebM, ~25fps variable frame
// timing, and — see capture.mjs — usually a bit slower than real time
// because screencasting competes with the page for CPU) into a clean,
// constant-30fps H.264 MP4 at the correct intended pacing.
//
// A `minterpolate` blend pass was tried here to push this to a genuine
// 60fps. Don't reintroduce it: blend mode's whole mechanism is cross-fading
// between the two nearest real frames, which is a literal double-exposure
// on anything that moved between them — confirmed as visible ghosting on
// every fast-moving element in this content (confetti, popups snapping in,
// spring-bounce text, scene cuts). That's not a corner case here, it's most
// of what's on screen. A genuinely higher, artifact-free frame rate needs
// the source to actually contain more real frames — Remotion (frame-exact,
// no fps ceiling) is the tool for that, not interpolating a 25fps capture.
import ffmpegPath from 'ffmpeg-static'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const OUTPUT_NAMES = {
  'precision-explainer': 'Precision_Reel_Explainer_16x9.mp4',
  'chaos-to-launch': 'Precision_Reel_ChaosToLaunch.mp4',
  'problem-solution': 'Precision_Reel_ProblemSolution.mp4',
}
const REEL = process.argv.find((a) => a.startsWith('--reel='))?.split('=')[1] || 'precision-explainer'
if (!OUTPUT_NAMES[REEL]) {
  console.error(`Unknown --reel="${REEL}". Known reels: ${Object.keys(OUTPUT_NAMES).join(', ')}`)
  process.exit(1)
}

const IN = path.join(root, 'capture', `reel-${REEL}.raw.webm`)
const META = path.join(root, 'capture', `meta-${REEL}.json`)
const OUT = path.join(root, 'capture', OUTPUT_NAMES[REEL])

if (!existsSync(IN)) {
  console.error(`No raw capture found at ${IN}. Run \`npm run capture -- --reel=${REEL}\` first.`)
  process.exit(1)
}

let speedRatio = 1
if (existsSync(META)) {
  const { targetMs, actualMs } = JSON.parse(await readFile(META, 'utf-8'))
  speedRatio = actualMs / targetMs // >1 means the capture ran slower than the real content
  if (Math.abs(speedRatio - 1) > 0.02) {
    console.log(
      `Retiming: capture ran at ${speedRatio.toFixed(3)}x real time (${actualMs}ms recorded for ${targetMs}ms of content) — correcting.`,
    )
  }
} else {
  console.warn('No capture/meta.json found — encoding at the raw capture speed, unretimed.')
}

// The source capture is a real screen recording at Chromium's own
// screencast rate (~25fps) — simply telling ffmpeg to output at a higher
// `-r` just duplicates existing frames, which changes the file's declared
// frame rate but not how smooth anything actually looks. `minterpolate`
// genuinely synthesizes new in-between frames instead, which is what
// perceived smoothness on a higher frame rate actually requires. `blend`
// mode (not full motion-compensated `mci`) is the safer choice for UI/text
// content: it doesn't try to warp/predict motion vectors around sharp
// edges, so it won't introduce the ghosting artifacts mci can on typography.
const OUTPUT_FPS = 30
const videoFilter = []
if (Math.abs(speedRatio - 1) > 0.005) videoFilter.push(`setpts=${(1 / speedRatio).toFixed(6)}*PTS`)

const args = [
  '-y',
  '-i', IN,
  '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
  ...(videoFilter.length ? ['-vf', videoFilter.join(',')] : []),
  '-shortest',
  '-r', String(OUTPUT_FPS),
  '-fps_mode', 'cfr',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-profile:v', 'high',
  '-level', '4.2',
  '-c:a', 'aac',
  '-b:a', '96k',
  '-movflags', '+faststart',
  OUT,
]

console.log('Encoding', IN, '->', OUT)
const proc = spawn(ffmpegPath, args, { stdio: 'inherit' })
proc.on('exit', (code) => {
  if (code === 0) {
    console.log('\nDone:', OUT)
  } else {
    console.error('ffmpeg exited with code', code)
    process.exit(code ?? 1)
  }
})
