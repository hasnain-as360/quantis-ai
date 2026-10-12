import { useCallback, useEffect, useState } from 'react'

// Drives a list of { duration } beats forward on a plain setTimeout chain.
//
// This is deliberately a discrete beat sequencer, not a scrubbable frame
// clock: Framer Motion is a mount/trigger animation library (it interpolates
// in response to a target changing), not a timeline you scrub like a video
// editor. If a frame-accurate scrubber/exporter is ever needed, that's a
// Remotion job — for a live, screen-recorded playthrough, advancing a beat
// index and letting each scene react to it is the right-sized tool.
export function useBeatSequencer(beats) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return undefined
    const current = beats[index]
    if (!current) return undefined

    const timer = setTimeout(() => {
      setIndex((i) => {
        const next = i + 1
        if (next >= beats.length) {
          setPlaying(false)
          return i // hold on the final beat instead of running past the end
        }
        return next
      })
    }, current.duration)

    return () => clearTimeout(timer)
  }, [index, playing, beats])

  const play = useCallback(() => setPlaying(true), [])
  const pause = useCallback(() => setPlaying(false), [])
  const restart = useCallback(() => {
    setIndex(0)
    setPlaying(true)
  }, [])
  const seekTo = useCallback(
    (i) => setIndex(Math.max(0, Math.min(beats.length - 1, i))),
    [beats.length],
  )

  return { index, beat: beats[index], playing, play, pause, restart, seekTo }
}
