// Single source of truth for tint -> Tailwind class lookups.
//
// IMPORTANT: Tailwind's scanner only picks up class names that appear as
// complete literal strings in the source. A template like `bg-${tint}` is
// invisible to it and silently produces no styles. Every class below is
// written out in full so the JIT compiler can find it.
export const TINTS = {
  brand: {
    bar: 'bg-brand',
    text: 'text-brand',
    chip: 'bg-brand/10',
    chart: 'bg-brand/70',
  },
  purple: {
    bar: 'bg-accent-purple',
    text: 'text-accent-purple',
    chip: 'bg-accent-purple/10',
    chart: 'bg-accent-purple/70',
  },
  green: {
    bar: 'bg-accent-green',
    text: 'text-accent-green',
    chip: 'bg-accent-green/10',
    chart: 'bg-accent-green/70',
  },
  orange: {
    bar: 'bg-accent-orange',
    text: 'text-accent-orange',
    chip: 'bg-accent-orange/10',
    chart: 'bg-accent-orange/70',
  },
  cyan: {
    bar: 'bg-bloom-cyan',
    text: 'text-sky-600',
    chip: 'bg-bloom-cyan/25',
    chart: 'bg-bloom-cyan',
  },
}
