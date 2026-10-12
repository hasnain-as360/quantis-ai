// Fixed reference size for the 9:16 stage. This is a purpose-built recording
// canvas (not a responsive layout), so every scatter/position calculation in
// the scenes is calibrated against these exact numbers rather than measured
// at runtime.
export const STAGE_W = 480
export const STAGE_H = Math.round((STAGE_W * 16) / 9) // 853

// Final export resolution. Rather than re-tuning every hand-placed pixel
// value in the scenes for a bigger canvas, RecordExport renders the exact
// same STAGE_W x STAGE_H composition and scales it up with a CSS transform —
// Chromium rasterizes transformed subtrees (blur, text, shadows included) at
// the resulting effective resolution, so this stays crisp at capture time.
export const EXPORT_W = 1080
export const EXPORT_H = Math.round((EXPORT_W * 16) / 9) // 1920
export const EXPORT_SCALE = EXPORT_W / STAGE_W // 2.25

// Landscape variant (reel 3, "Precision Explainer" — 16:9). Kept alongside
// rather than replacing the portrait constants above, since reel 1 and
// reel 2's whole scatter/position math is hand-tuned against STAGE_W/H.
export const STAGE_W_L = 960
export const STAGE_H_L = 540
export const EXPORT_W_L = 1920
export const EXPORT_H_L = 1080
export const EXPORT_SCALE_L = EXPORT_W_L / STAGE_W_L // 2
