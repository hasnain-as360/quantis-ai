// Reel 3 — "Precision Explainer", 16:9 landscape. Exact scene durations as
// specified: 5s / 6s / 16s / 10s / 2s = 39s total. Same flat micro-beat
// pattern as reel 2 (kept JSX-free so Node's capture.mjs can import
// TOTAL_DURATION directly).
export const BEATS = [
  // Scene 1 — The Problem, pure kinetic typography (0-5000ms)
  { id: 's1-line1', scene: 'problem', duration: 2500 },
  { id: 's1-line2', scene: 'problem', duration: 2500 },

  // Scene 2 — The Problem, in detail (5000-11000ms)
  { id: 's2-setup', scene: 'detail', duration: 800 },
  { id: 's2-popup1', scene: 'detail', duration: 900 },
  { id: 's2-popup2', scene: 'detail', duration: 900 },
  { id: 's2-popup3', scene: 'detail', duration: 900 },
  { id: 's2-popup4', scene: 'detail', duration: 900 },
  { id: 's2-caption', scene: 'detail', duration: 1600 },

  // Scene 3 — The Solution (11000-27000ms). Trimmed the other beats by
  // 1800ms total to make room for 's3-wizard-launched' — the "Campaign
  // Launched!" success step (SS/Screenshot 799) that was missing before —
  // without changing the brief's 16s total for this scene.
  { id: 's3-reveal', scene: 'solution', duration: 1800 },
  { id: 's3-dashboard-in', scene: 'solution', duration: 1000 },
  { id: 's3-dashboard-hold', scene: 'solution', duration: 1800 },
  { id: 's3-wizard-channels', scene: 'solution', duration: 1700 },
  { id: 's3-wizard-schedule', scene: 'solution', duration: 1600 },
  { id: 's3-wizard-audience', scene: 'solution', duration: 1600 },
  { id: 's3-wizard-generating', scene: 'solution', duration: 1900 },
  { id: 's3-wizard-launch', scene: 'solution', duration: 1800 },
  { id: 's3-wizard-launched', scene: 'solution', duration: 1800 },
  { id: 's3-settle', scene: 'solution', duration: 1000 },

  // Scene 4 — Core features, interactive list (27000-37000ms)
  { id: 's4-feature1', scene: 'features', duration: 2500 },
  { id: 's4-feature2', scene: 'features', duration: 2500 },
  { id: 's4-feature3', scene: 'features', duration: 2500 },
  { id: 's4-feature4', scene: 'features', duration: 2500 },

  // Scene 5 — Outro, logo (37000-39000ms)
  { id: 's5-logo', scene: 'outro', duration: 2000 },
]

export const TOTAL_DURATION = BEATS.reduce((sum, b) => sum + b.duration, 0)

const idOf = (id) => BEATS.findIndex((b) => b.id === id)
export const IDX = Object.fromEntries(BEATS.map((b) => [b.id, idOf(b.id)]))
