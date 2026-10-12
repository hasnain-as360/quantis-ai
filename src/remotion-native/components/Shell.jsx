import { LayoutDashboard, Inbox, Settings, Sparkles, Clapperboard, CalendarDays } from 'lucide-react'
import logo from '../../assets/logo.png'
import { COLOR, FONT } from '../theme'

const NAV = [LayoutDashboard, Inbox, Settings, Sparkles, Clapperboard, CalendarDays]

// SHELL_TOP/SHELL_LEFT are exported so Scene3_Solution's content area can
// stay in sync with these dimensions instead of hardcoding matching numbers
// in two places.
export const SHELL_TOP = 64
export const SHELL_LEFT = 76

export default function Shell({ opacity = 1 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: SHELL_TOP,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${COLOR.border}`,
          background: COLOR.white,
          padding: '0 28px',
        }}
      >
        <img src={logo} alt="Precision by CyberGen" style={{ height: 28 }} />
        <span
          style={{
            borderRadius: 999,
            background: '#F1F3F5',
            padding: '6px 18px',
            fontFamily: FONT.family,
            fontSize: 15,
            fontWeight: 600,
            color: COLOR.inkSoft,
          }}
        >
          CyberSecure &middot; Admin
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: SHELL_TOP,
          bottom: 0,
          left: 0,
          width: SHELL_LEFT,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          paddingTop: 26,
          borderRight: `1px solid ${COLOR.border}`,
          background: COLOR.white,
        }}
      >
        {NAV.map((Icon, i) => (
          <span
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: i === 3 ? 'rgba(43,145,229,0.1)' : 'transparent',
              color: i === 3 ? COLOR.brand : 'rgba(75,85,102,0.7)',
            }}
          >
            <Icon size={24} strokeWidth={2} />
          </span>
        ))}
      </div>
    </div>
  )
}
