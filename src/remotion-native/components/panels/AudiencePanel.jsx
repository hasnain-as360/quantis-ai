import { Search, Users } from 'lucide-react'
import { COLOR, FONT } from '../../theme'

export default function AudiencePanel() {
  const lists = [
    { name: 'contacts sample (2)', count: '2' },
    { name: 'Warmup List', count: '677,378', selected: true },
  ]
  return (
    <div style={{ borderRadius: 20, border: `1px solid ${COLOR.borderSoft}`, background: 'rgba(255,255,255,0.85)', padding: 32 }}>
      <p style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0, fontFamily: FONT.family, fontWeight: 700, fontSize: 22, color: COLOR.ink }}>
        <Users size={24} color={COLOR.brand} /> Who&rsquo;s receiving this campaign?
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, border: `1px solid ${COLOR.border}`, borderRadius: 12, padding: '14px 20px' }}>
        <Search size={20} color={COLOR.inkSoft} />
        <span style={{ fontFamily: FONT.family, fontSize: 16, color: COLOR.inkSoft }}>Search lists or segments&hellip;</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
        {lists.map((l) => (
          <div
            key={l.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 12,
              padding: '16px 20px',
              border: `1px solid ${l.selected ? COLOR.brand : COLOR.border}`,
              background: l.selected ? '#EAF4FD' : COLOR.white,
            }}
          >
            <span style={{ fontFamily: FONT.family, fontWeight: 600, fontSize: 17, color: COLOR.ink }}>{l.name}</span>
            <span style={{ fontFamily: FONT.family, fontWeight: 700, fontSize: 16, color: COLOR.inkSoft }}>{l.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
