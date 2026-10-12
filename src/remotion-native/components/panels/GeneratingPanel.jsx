import { Wand2, X, Star, Zap } from 'lucide-react'
import { COLOR, FONT } from '../../theme'

// `frame` here is LOCAL to the generating beat (passed by the caller) so the
// progress bar always starts at 0% the instant this panel appears.
export default function GeneratingPanel({ localFrame, progress }) {
  const wobble = Math.sin(localFrame / 5) * 8

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderRadius: 999,
            background: '#FDF0F0',
            padding: '10px 18px',
            fontFamily: FONT.family,
            fontWeight: 700,
            fontSize: 15,
            color: '#E11D48',
          }}
        >
          <X size={18} /> Cancel Generation
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderRadius: 999,
            background: COLOR.goldBg,
            padding: '10px 18px',
            fontFamily: FONT.family,
            fontWeight: 700,
            fontSize: 15,
            color: COLOR.gold,
          }}
        >
          <Star size={18} fill={COLOR.gold} /> Precision AI Agents
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '8px 0' }}>
        <span
          style={{
            marginBottom: 18,
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: `3px solid ${COLOR.brand}`,
            color: COLOR.brand,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${wobble}deg)`,
          }}
        >
          <Wand2 size={34} />
        </span>
        <p style={{ margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 26, color: COLOR.ink }}>Generating Content</p>
        <p style={{ margin: '8px 0 0', fontFamily: FONT.family, fontSize: 17, color: COLOR.inkSoft }}>
          Our AI agents are crafting your content with specialized models&hellip;
        </p>
      </div>

      <div style={{ marginTop: 24, borderRadius: 16, border: `1px solid ${COLOR.borderSoft}`, background: 'rgba(255,255,255,0.85)', padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.family, fontWeight: 700, fontSize: 17, color: COLOR.ink }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Zap size={20} color={COLOR.brand} /> Overall Progress
          </span>
          <span style={{ color: COLOR.brand }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ marginTop: 14, height: 12, borderRadius: 999, background: COLOR.border, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 999, background: COLOR.brand, width: `${progress}%` }} />
        </div>
      </div>

      <p style={{ margin: '24px 0 10px', fontFamily: FONT.family, fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', color: 'rgba(75,85,102,0.8)', textTransform: 'uppercase' }}>
        Content generation progress
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderRadius: 12, border: `1px solid ${COLOR.borderSoft}`, background: 'rgba(255,255,255,0.7)', padding: '16px 20px' }}>
        <span style={{ fontFamily: FONT.family, fontWeight: 600, fontSize: 17, color: COLOR.ink }}>Email 1</span>
        <span style={{ fontFamily: FONT.family, fontWeight: 600, fontSize: 15, color: COLOR.inkSoft }}>{progress < 100 ? 'Pending' : 'Complete'}</span>
      </div>
    </div>
  )
}
