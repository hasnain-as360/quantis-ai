import { Clock, CalendarDays } from 'lucide-react'
import { COLOR, FONT } from '../../theme'

export default function SchedulePanel() {
  const options = ['Post Now', '1 Week', '2 Weeks']
  const selected = '1 Week'
  return (
    <div style={{ borderRadius: 20, border: `1px solid ${COLOR.borderSoft}`, background: 'rgba(255,255,255,0.85)', padding: 32 }}>
      <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 22, color: COLOR.ink }}>
        <Clock size={24} color={COLOR.brand} /> Campaign Duration
      </p>
      <p style={{ margin: '4px 0 0', fontFamily: FONT.family, fontSize: 16, color: COLOR.inkSoft }}>How long should your campaign run?</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
        {options.map((o) => {
          const isSel = o === selected
          return (
            <span
              key={o}
              style={{
                borderRadius: 12,
                padding: '18px 0',
                textAlign: 'center',
                fontFamily: FONT.family,
                fontWeight: 700,
                fontSize: 18,
                border: `1px solid ${isSel ? COLOR.brand : COLOR.border}`,
                background: isSel ? COLOR.brand : COLOR.white,
                color: isSel ? '#fff' : COLOR.ink,
              }}
            >
              {o}
            </span>
          )
        })}
      </div>
      <p style={{ margin: '24px 0 8px', fontFamily: FONT.family, fontSize: 16, fontWeight: 600, color: COLOR.inkSoft }}>Start Date</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${COLOR.border}`, borderRadius: 12, padding: '14px 20px' }}>
        <CalendarDays size={20} color={COLOR.inkSoft} />
        <span style={{ fontFamily: FONT.family, fontWeight: 600, fontSize: 17, color: COLOR.ink }}>Sep 15, 2026</span>
      </div>
    </div>
  )
}
