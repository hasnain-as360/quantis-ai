// Reel 2 — "Chaos to Launch". The brief's 4 scenes (0-4s / 4-7s / 7-11s /
// 11-15s) are each broken into several fine-grained micro-beats — cursor
// moves, toggle-ons, stepper advances, and panel swaps all need tighter
// sequencing than 4 coarse beats could give. This still reuses the exact
// same useBeatSequencer as reel 1 (and beats.js stays JSX-free so Node's
// capture.mjs can import TOTAL_DURATION directly).
export const BEATS = [
  // Scene 1: The Chaos (0-4000ms)
  { id: 'chaos-phrase1', scene: 'chaos', duration: 2000 },
  { id: 'chaos-phrase2', scene: 'chaos', duration: 2000 },

  // Scene 2: The Turn (4000-7000ms)
  { id: 'turn-snap', scene: 'turn', duration: 500 },
  { id: 'turn-stepper', scene: 'turn', duration: 700 },
  { id: 'turn-panel', scene: 'turn', duration: 1800 },

  // Scene 3: The Interactive Flow (7000-11000ms)
  { id: 'flow-toggle-email', scene: 'flow', duration: 500 },
  { id: 'flow-toggle-newsletter', scene: 'flow', duration: 400 },
  { id: 'flow-toggle-tiktok', scene: 'flow', duration: 400 },
  { id: 'flow-toggle-instagram', scene: 'flow', duration: 500 },
  { id: 'flow-stepper-advance', scene: 'flow', duration: 500 },
  { id: 'flow-generating', scene: 'flow', duration: 1400 },
  { id: 'flow-generating-done', scene: 'flow', duration: 300 },

  // Scene 4: The Climax & CTA (11000-15000ms)
  { id: 'climax-stepper-advance', scene: 'climax', duration: 500 },
  { id: 'climax-ready', scene: 'climax', duration: 1300 },
  { id: 'climax-cursor', scene: 'climax', duration: 700 },
  { id: 'climax-click', scene: 'climax', duration: 300 },
  { id: 'climax-success', scene: 'climax', duration: 1200 },
]

export const TOTAL_DURATION = BEATS.reduce((sum, b) => sum + b.duration, 0)

// The 8-step wizard, straight from the reference recording.
export const STEPS = ['Channels', 'Schedule', 'Audience', 'Refine', 'Content', 'Create', 'Review', 'Launch']

// Absolute index of each named micro-beat, so scene components can do plain
// `index >= IDX.flowToggleEmail` checks instead of re-deriving positions.
const idOf = (id) => BEATS.findIndex((b) => b.id === id)
export const IDX = {
  chaosPhrase1: idOf('chaos-phrase1'),
  chaosPhrase2: idOf('chaos-phrase2'),
  turnSnap: idOf('turn-snap'),
  turnStepper: idOf('turn-stepper'),
  turnPanel: idOf('turn-panel'),
  flowToggleEmail: idOf('flow-toggle-email'),
  flowToggleNewsletter: idOf('flow-toggle-newsletter'),
  flowToggleTiktok: idOf('flow-toggle-tiktok'),
  flowToggleInstagram: idOf('flow-toggle-instagram'),
  flowStepperAdvance: idOf('flow-stepper-advance'),
  flowGenerating: idOf('flow-generating'),
  flowGeneratingDone: idOf('flow-generating-done'),
  climaxStepperAdvance: idOf('climax-stepper-advance'),
  climaxReady: idOf('climax-ready'),
  climaxCursor: idOf('climax-cursor'),
  climaxClick: idOf('climax-click'),
  climaxSuccess: idOf('climax-success'),
}
