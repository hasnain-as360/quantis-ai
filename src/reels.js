import { BEATS as BEATS_PROBLEM_SOLUTION } from './data/beats'
import ReelCanvas from './components/ReelCanvas'
import { BEATS as BEATS_CHAOS_LAUNCH } from './reel2/beats'
import Canvas2 from './reel2/Canvas2'
import { BEATS as BEATS_EXPLAINER } from './reel3/beats'
import Canvas3 from './reel3/Canvas3'
import { STAGE_W, STAGE_H, EXPORT_W, EXPORT_H, EXPORT_SCALE, STAGE_W_L, STAGE_H_L, EXPORT_W_L, EXPORT_H_L, EXPORT_SCALE_L } from './data/constants'

const portrait = { stageW: STAGE_W, stageH: STAGE_H, exportW: EXPORT_W, exportH: EXPORT_H, exportScale: EXPORT_SCALE }
const landscape = {
  stageW: STAGE_W_L,
  stageH: STAGE_H_L,
  exportW: EXPORT_W_L,
  exportH: EXPORT_H_L,
  exportScale: EXPORT_SCALE_L,
}

// Both reels live in this one project and share its Tailwind theme, fonts,
// and capture/encode pipeline; this registry is the only thing that picks
// between them. Select with ?reel=<key> (see Stage.jsx / RecordExport.jsx);
// `npm run export-video -- --reel=<key>` does the same for a rendered file.
export const REELS = {
  'precision-explainer': { beats: BEATS_EXPLAINER, Canvas: Canvas3, ...landscape },
  'chaos-to-launch': { beats: BEATS_CHAOS_LAUNCH, Canvas: Canvas2, ...portrait },
  'problem-solution': { beats: BEATS_PROBLEM_SOLUTION, Canvas: ReelCanvas, ...portrait },
}

export const DEFAULT_REEL = 'precision-explainer'

export function resolveReel(key) {
  return REELS[key] || REELS[DEFAULT_REEL]
}
