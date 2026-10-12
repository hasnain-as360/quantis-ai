import { Rocket, Users, Mail, CalendarClock, CheckCircle2 } from 'lucide-react'
import { COLOR, FONT } from '../../theme'

export default function LaunchPanel() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
          }}
        >
          <Rocket size={34} />
        </span>
        <p style={{ margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 26, color: COLOR.ink }}>Ready to Launch!</p>
        <p style={{ margin: '6px 0 0', fontFamily: FONT.family, fontSize: 17, color: COLOR.inkSoft }}>Your campaign is configured and ready to go</p>
      </div>

      <div style={{ display: 'flex', gap: 28, marginTop: 24, borderRadius: 16, border: `1px solid ${COLOR.borderSoft}`, background: 'rgba(255,255,255,0.7)', padding: '18px 22px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT.family, fontSize: 17, color: COLOR.ink }}>
          <Users size={20} color={COLOR.brand} /> <b>51</b> <span style={{ color: COLOR.inkSoft }}>recipients</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT.family, fontSize: 17, color: COLOR.ink }}>
          <Mail size={20} color={COLOR.brand} /> <b>1</b> <span style={{ color: COLOR.inkSoft }}>email</span>
        </span>
      </div>

      <div style={{ marginTop: 16, borderRadius: 16, border: '1px solid rgba(43,145,229,0.15)', background: 'rgba(43,145,229,0.06)', padding: '18px 22px' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 18, color: COLOR.ink }}>
          <CalendarClock size={20} color={COLOR.brand} /> Campaign Schedule
        </p>
        <p style={{ margin: '6px 0 0', fontFamily: FONT.family, fontSize: 15.5, color: COLOR.inkSoft }}>Sep 15 &ndash; Sep 15, 2026 &middot; one-time send</p>
      </div>

      <div style={{ marginTop: 16, borderRadius: 16, border: `1px solid ${COLOR.borderSoft}`, background: 'rgba(255,255,255,0.6)', padding: '18px 22px' }}>
        {['1 email will be scheduled for 51 contacts', 'First email sends on Sep 15 at 9:00 AM'].map((line) => (
          <div key={line} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: FONT.family, fontSize: 15.5, color: COLOR.inkSoft, marginBottom: 8 }}>
            <CheckCircle2 size={18} color={COLOR.green} style={{ marginTop: 1, flexShrink: 0 }} /> {line}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderRadius: 999,
            background: COLOR.brand,
            padding: '16px 32px',
            fontFamily: FONT.family,
            fontWeight: 700,
            fontSize: 18,
            color: '#fff',
            boxShadow: '0 8px 22px rgba(43,145,229,0.4)',
          }}
        >
          <Rocket size={20} /> Launch Campaign
        </span>
      </div>
    </div>
  )
}
