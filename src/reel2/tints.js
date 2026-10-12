// Same rationale as src/data/tints.js: Tailwind's scanner only sees literal
// class strings, so every lookup used by reel2 lives here in full rather
// than being built with a template literal.
export const TINTS2 = {
  brand: { chip: 'bg-brand', ring: 'ring-brand' },
  purple: { chip: 'bg-accent-purple', ring: 'ring-accent-purple' },
  inkBlack: { chip: 'bg-ink-black', ring: 'ring-ink-black' },
  green: { chip: 'bg-accent-green', ring: 'ring-accent-green' },
}

// Instagram's real mark is a gradient, not a flat color — cheap to render
// (no blur) so there's no cost reason to flatten it, and it's the one icon
// that reads as noticeably wrong if flattened.
export const INSTAGRAM_GRADIENT = 'linear-gradient(135deg, #833AB4 0%, #E1306C 55%, #F77737 100%)'
