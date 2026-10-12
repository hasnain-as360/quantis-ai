import { useCurrentFrame, useVideoConfig } from 'remotion'
import logo from '../../assets/logo.png'
import { COLOR, FONT } from '../theme'
import { pop, ease } from '../anim'

// Shared between Scene 3's "Meet Precision" pivot and Scene 5's outro.
export default function LogoReveal({ start, width = 220, showTagline = false, topLabel }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = Math.min(1, pop(frame, fps, start))
  const glowT = ease(frame, 0, 1, start, 18)

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div
        style={{
          position: 'absolute',
          width: width * 1.5,
          height: width * 1.5,
          borderRadius: '50%',
          background: 'rgba(43,145,229,0.2)',
          filter: 'blur(60px)',
          opacity: glowT * 0.7,
          transform: `scale(${0.4 + glowT * 0.9})`,
        }}
      />
      {topLabel && (
        <p
          style={{
            position: 'relative',
            margin: 0,
            opacity: s,
            transform: `translateY(${(1 - s) * 10}px)`,
            fontFamily: FONT.family,
            fontWeight: 600,
            fontSize: 22,
            color: COLOR.inkSoft,
          }}
        >
          {topLabel}
        </p>
      )}
      <img
        src={logo}
        alt="Precision by CyberGen"
        style={{ position: 'relative', width, opacity: s, transform: `scale(${0.6 + s * 0.4})` }}
      />
      {showTagline && (
        <p
          style={{
            position: 'relative',
            margin: 0,
            opacity: ease(frame, 0, 1, start + 12, 12),
            fontFamily: FONT.family,
            fontWeight: 600,
            fontSize: 20,
            color: COLOR.ink,
          }}
        >
          Stop guessing. <span style={{ color: COLOR.brand }}>Start shipping.</span>
        </p>
      )}
    </div>
  )
}
