// Same scene flow, same copy, same per-scene durations as the Tailwind/
// Framer Motion build's src/reel3/beats.js — converted once to frames here
// (all divide evenly at 30fps) rather than carried as milliseconds, since
// everything in this rebuild is driven by frame math directly.
export const FPS = 30

export const SCENE_FRAMES = {
  problem: 150, // 5.0s
  detail: 180, // 6.0s
  solution: 480, // 16.0s
  features: 300, // 10.0s
  outro: 60, // 2.0s
}

export const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0) // 1170 = 39.0s

// Each scene's internal beats as [startFrame, endFrame], LOCAL to that
// scene's <Sequence> — Remotion's useCurrentFrame() already returns the
// frame relative to the nearest ancestor Sequence, so these numbers don't
// need any offset math at the call site.
export const PROBLEM = {
  line1: [0, 75],
  line2: [75, 150],
}

export const DETAIL = {
  setup: [0, 24],
  popup1: [24, 51],
  popup2: [51, 78],
  popup3: [78, 105],
  popup4: [105, 132],
  caption: [132, 180],
}

export const SOLUTION = {
  reveal: [0, 54],
  dashboardIn: [54, 84],
  dashboardHold: [84, 138],
  channels: [138, 189],
  schedule: [189, 237],
  audience: [237, 285],
  generating: [285, 342],
  launch: [342, 396],
  launched: [396, 450],
  settle: [450, 480],
}

export const FEATURE_BEATS = [
  [0, 75],
  [75, 150],
  [150, 225],
  [225, 300],
]
