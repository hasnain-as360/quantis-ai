// The first 6 beats of the storyboard: The Problem (4 staccato clauses) and
// The Solution (the chaos->order pivot, then the dashboard reveal begins).
// One array drives captions, window density, and the scene sequencer, so
// timing can never drift out of sync between them.
export const BEATS = [
  { id: 'tabs', caption: 'Ten tabs.', duration: 1500 },
  { id: 'platforms', caption: 'Five platforms.', duration: 1500 },
  { id: 'clarity', caption: 'Zero clarity.', duration: 1500 },
  { id: 'guessing', caption: 'Most agencies are just guessing.', duration: 2000 },
  { id: 'reveal', caption: 'Meet Precision.', duration: 2200 },
  {
    id: 'order',
    caption: 'The AI command center that brings order to the chaos.',
    duration: 3300,
  },
]

export const TOTAL_DURATION = BEATS.reduce((sum, b) => sum + b.duration, 0)
