import { useCurrentFrame, useVideoConfig } from 'remotion'
import { COLOR, FONT } from '../theme'
import { fadeRise } from '../anim'

// Frosted caption pill. `center` places it dead-center (both axes) instead
// of the default lower-third position — used for the Scene 2 moment that
// needs to match a specific reference frame exactly.
export default function Caption({ children, start, center = false, wide = false }) {
  const frame = useCurrentFrame()
  const { opacity, y } = fadeRise(frame, start, 14, 18)

  const wrapperStyle = center
    ? { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
    : { position: 'absolute', left: 0, right: 0, bottom: '6%', display: 'flex', justifyContent: 'center' }

  return (
    <div style={wrapperStyle}>
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          maxWidth: wide ? '90%' : '80%',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 28,
          padding: '24px 40px',
          textAlign: 'center',
          fontFamily: FONT.family,
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1.25,
          color: COLOR.ink,
          boxShadow: '0 14px 36px rgba(15,23,42,0.16)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
