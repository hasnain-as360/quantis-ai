import { Rocket, CheckCircle2, Mail } from 'lucide-react'
import { COLOR, FONT } from '../../theme'
import { pop, ease } from '../../anim'

// `localFrame` is relative to when this panel first appeared.
export default function SuccessPanel({ localFrame, fps }) {
  const rocketS = Math.min(1, pop(localFrame, fps, 0))
  const checkS = Math.min(1, pop(localFrame, fps, 4))
  const headingT = ease(localFrame, 0, 1, 7, 10)
  const subT = ease(localFrame, 0, 1, 10, 10)
  const chipT = ease(localFrame, 0, 1, 14, 10)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 0' }}>
      <span
        style={{
          marginBottom: 16,
          width: 76,
          height: 76,
          borderRadius: '50%',
          background: COLOR.brand,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 22px rgba(43,145,229,0.45)',
          transform: `scale(${0.7 + rocketS * 0.3})`,
        }}
      >
        <Rocket size={34} />
      </span>
      <span
        style={{
          marginBottom: 16,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: `3px solid ${COLOR.green}`,
          color: COLOR.green,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: checkS,
          transform: `scale(${checkS})`,
        }}
      >
        <CheckCircle2 size={34} />
      </span>
      <p
        style={{
          margin: 0,
          opacity: headingT,
          transform: `translateY(${(1 - headingT) * 8}px)`,
          fontFamily: FONT.family,
          fontWeight: 800,
          fontSize: 34,
          background: `linear-gradient(90deg, ${COLOR.brand}, ${COLOR.purple}, ${COLOR.rose})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Campaign Launched!
      </p>
      <p style={{ margin: '8px 0 0', opacity: subT, fontFamily: FONT.family, fontSize: 17, color: COLOR.inkSoft }}>
        Your campaign will start sending to 51 contacts now
      </p>
      <div
        style={{
          marginTop: 24,
          opacity: chipT,
          transform: `translateY(${(1 - chipT) * 6}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          borderRadius: 14,
          border: `1px solid ${COLOR.borderSoft}`,
          background: 'rgba(255,255,255,0.7)',
          padding: '16px 26px',
        }}
      >
        <span style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(43,145,229,0.1)', color: COLOR.brand, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mail size={22} />
        </span>
        <span style={{ fontFamily: FONT.family, fontWeight: 700, fontSize: 16, color: COLOR.ink }}>Email</span>
        <span style={{ fontFamily: FONT.family, fontSize: 14, color: COLOR.inkSoft }}>Sending</span>
      </div>
    </div>
  )
}
