import { interpolate, spring, Easing } from 'remotion'

// Small helpers wrapping Remotion's own `interpolate`/`spring` — the whole
// point of this rebuild is that every animated value is a pure function of
// `frame`, computed fresh for whichever frame Remotion asks for. There is
// no Framer Motion anywhere in this tree, so there's nothing that can drift
// out of sync with the frame Remotion is actually capturing.

// Springy pop-in: scale 0.6->1 with real overshoot, matching the feel of
// the Framer Motion springs in the original build.
export function pop(frame, fps, delay = 0) {
  return spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 160, mass: 0.9 } })
}

// Smooth ease (no overshoot) — for fades, slides, progress bars.
export function ease(frame, from, to, start, duration) {
  return interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
}

// Fade + rise, the workhorse for captions and headings.
export function fadeRise(frame, start, duration = 14, riseFrom = 18) {
  const t = ease(frame, 0, 1, start, duration)
  return { opacity: t, y: (1 - t) * riseFrom }
}

// Stagger helper: returns a per-index start frame for a common "each item
// N frames after the last" pattern.
export function stagger(index, base, gapFrames = 5) {
  return base + index * gapFrames
}

// Deterministic step-chase for the wizard stepper: instead of teleporting
// from one step to another, it visibly steps through each intermediate
// value a few frames apart — reads as "the wizard racing ahead on its own"
// rather than a hard cut. Fully a function of frame, so it renders
// identically no matter which frame Remotion asks for, in any order.
export function chaseStep(frame, beatStart, fromStep, toStep, framesPerStep = 4) {
  if (frame < beatStart) return fromStep
  const dir = toStep > fromStep ? 1 : -1
  const stepsTaken = Math.floor((frame - beatStart) / framesPerStep)
  const value = fromStep + dir * stepsTaken
  return dir > 0 ? Math.min(value, toStep) : Math.max(value, toStep)
}
