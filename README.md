# Precision promo reels

React + Tailwind CSS v4 + Framer Motion, rendered to MP4. Three independent
reels live here, sharing one Tailwind theme, one set of design tokens, and
one render pipeline.

| Reel key | Aspect | Duration | What it is |
|---|---|---|---|
| `precision-explainer` (default) | 16:9 landscape | 39s | Problem → detail → solution walkthrough → features → outro |
| `chaos-to-launch` | 9:16 portrait | ~15s | Chaos-of-tools → Precision wizard → launch → confetti |
| `problem-solution` | 9:16 portrict | ~12s | Chaos → "Meet Precision" → dashboard reveal |

## Preview while you work

```bash
npm install
npm run dev
```

Opens the interactive `Stage` at `localhost:5173` — a reel switcher, the
9:16/16:9 canvas at its real pixel size, and playback controls (play/pause/
restart, click any scrubber segment to jump straight to that beat). Only the
canvas itself is meant to ever be recorded; everything below it is
production UI.

Add `?reel=<key>` to load a specific reel directly.

## How a scene knows what to show: the beat sequencer

Every reel is driven by one flat, ordered list of **beats** — `{ id,
duration, ...whatever that scene needs }` — advanced by
`hooks/useBeatSequencer.js` on a plain `setTimeout` chain. Scene components
never touch time directly; they just compare the current beat `index`
against named constants (`IDX['s3-wizard-channels']` etc.) to decide what's
on screen. This is a deliberate choice: Framer Motion is a trigger-based
animation library (interpolates when a target changes), not a scrubbable
timeline, so "what beat are we on" is the right level of abstraction for it
— see `src/reel3/beats.js` for the fullest example.

Each reel's own folder (`src/data|components|scenes` for reel 1,
`src/reel2/`, `src/reel3/`) is self-contained; `src/reels.js` is the only
place that ties a reel's `{ beats, Canvas, stageW/H, exportW/H/Scale }`
together into one registry, keyed by the string you pass as `?reel=`.

## Rendering to MP4 — two pipelines

### 1. Playwright capture (original, still default for existing reels)

```bash
npm run export-video -- --reel=<key>
```

Spins up a dedicated Vite dev server, records the chrome-less `?record=1`
export view with a real headless browser (`scripts/capture.mjs`), then
transcodes to H.264 (`scripts/encode.mjs`). Output lands in `capture/`.

Two things worth knowing if you touch these scripts:

- **Screencasting competes with the page for CPU.** The beat sequencer runs
  measurably slower while being recorded than it does in a plain tab.
  `capture.mjs` measures the real elapsed time against the intended
  duration and writes it to `meta-<reel>.json`; `encode.mjs` applies a
  `setpts` retime so the shipped file plays at the correct pace regardless
  of how long the recording machine actually took.
- **Windows process trees.** `child.kill()` on a `shell: true`-spawned
  process only signals the `cmd.exe` wrapper, not the real `vite`/`node`
  process under it — capture.mjs uses `taskkill /t /f` instead, or the next
  run hits `EADDRINUSE`.

### 2. Remotion (frame-accurate, added later)

```bash
npm run remotion:studio                        # interactive preview
npm run remotion:render -- <reel-key> out.mp4  # e.g. precision-explainer
```

`src/remotion/` adapts the *same* Canvas components to Remotion's
deterministic `useCurrentFrame()` clock instead of real time
(`useRemotionBeat.js` mirrors `useBeatSequencer`'s `{ index, beat }` shape,
so no scene code had to change). This fixes beat-sequencing exactly — no
wall-clock drift, no retiming correction needed — for whichever beat is
active at frame N.

**What it does *not* fix on its own:** the Framer Motion transitions
*inside* each beat (springs, `transition={{ duration }}`) are still
real-time animations, not `interpolate(frame, ...)` math. Remotion renders
them by actually letting them play out during each frame capture, which is
fine for most of what's here but isn't the frame-exact guarantee Remotion's
own primitives give. A fully frame-perfect render would mean migrating
those transitions to `interpolate()` — a real follow-up job, not something
this setup silently papers over.

Tailwind v4 needs its own hookup for Remotion's separate (webpack-based)
bundler — see `remotion.config.mjs`, which wires in `@remotion/tailwind-v4`.
Vite's `@tailwindcss/vite` plugin only covers `npm run dev`/`build`.

## Gotchas that will bite you again if you forget them

- **Tailwind's scanner only sees literal class strings.** `` `bg-${tint}` ``
  produces nothing — every color lookup goes through a `tints.js` file with
  the full class names written out (one per reel: `src/data/tints.js`,
  `src/reel2/tints.js`, `src/reel3/tints.js`).
- **lucide-react dropped brand icons** (`Instagram` isn't exported in the
  installed version) — `Camera` + the real brand gradient/color is the
  stand-in used throughout.
- **A caption sitting over live UI needs reserved space, not luck.** Every
  reel has at least one place where a bottom-anchored caption would
  otherwise overlap a card/button below it — the fix is always reserving
  real layout space (a `bottom-*` offset sized for the caption, or scaling
  the content down) rather than hoping it fits.
