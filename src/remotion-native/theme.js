// Plain JS design tokens — no Tailwind. Same hex values as the Vite/Tailwind
// build's src/index.css @theme block (sampled from logo.png), so the visual
// identity matches; just expressed as values instead of utility classes.
export const COLOR = {
  canvas: '#F8F9FA',
  ink: '#0B0D12',
  inkSoft: '#4B5566',
  inkSoft60: 'rgba(75,85,102,0.6)',
  inkSoft70: 'rgba(75,85,102,0.7)',

  brand: '#2B91E5',
  brandDark: '#1C6FB8',
  brandLight: '#8FC7F2',

  bloomCyan: '#8FE3F0',
  bloomLavender: '#C9B8F7',
  bloomMint: '#A8EFC5',

  green: '#17A673',
  purple: '#7C5CFF',
  orange: '#E8892B',
  rose: '#D6336C',
  inkBlack: '#17181C',
  gold: '#C88A2E',
  goldBg: '#FBF1DE',

  white: '#FFFFFF',
  border: '#E2E6EB',
  borderSoft: 'rgba(226,230,235,0.7)',
}

export const FONT = {
  family: 'Space Grotesk',
}

// A "glass" surface as a plain style object — the visual equivalent of the
// Tailwind build's `.glass` utility (bg-white/70 + backdrop-blur-xl +
// border + shadow), just written out instead of composed from classes.
export const glass = (extra = {}) => ({
  background: 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.85)',
  boxShadow: '0 8px 30px rgba(15,23,42,0.12)',
  ...extra,
})

export const card = (extra = {}) => ({
  background: COLOR.white,
  border: `1px solid ${COLOR.borderSoft}`,
  borderRadius: 16,
  ...extra,
})
