import { useCurrentFrame, useVideoConfig } from 'remotion'

// Drop-in replacement for hooks/useBeatSequencer's return shape ({ index,
// beat }), but derived from Remotion's deterministic useCurrentFrame()
// instead of a real-time setTimeout chain. Every Canvas component
// (ReelCanvas / Canvas2 / Canvas3) only ever consumes { index, beat } —
// they don't know or care which clock produced them — so this is the
// entire adapter needed to render the existing scenes under Remotion.
//
// IMPORTANT CAVEAT (read before assuming this makes everything
// frame-perfect): this fixes the *sequencer* — which beat is active at
// frame N is now exact, with no wall-clock drift. It does NOT change the
// individual Framer Motion transitions inside each scene/panel component
// (springs, `transition={{ duration: 0.3 }}`, etc.), which are still real
// time, not frame time. Remotion renders those by actually letting them
// play out during each frame capture, which works for most of what's here
// but is not the frame-exact guarantee Remotion's own `interpolate()` gives.
// Treat this as "exact beat timing, best-effort motion within a beat" —
// good enough for most cuts, but a true frame-perfect render would mean
// rewriting the Framer Motion transitions to `interpolate(frame, ...)`.
export function useRemotionBeat(beats) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const ms = (frame / fps) * 1000

  let acc = 0
  for (let i = 0; i < beats.length; i++) {
    const next = acc + beats[i].duration
    if (ms < next || i === beats.length - 1) {
      return { index: i, beat: beats[i] }
    }
    acc = next
  }
  return { index: beats.length - 1, beat: beats[beats.length - 1] }
}
