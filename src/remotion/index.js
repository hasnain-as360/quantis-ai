import { registerRoot } from 'remotion'
import RemotionRoot from './Root'
// The Vite entry (main.jsx) pulls this in for every reel's Tailwind theme,
// fonts, and glass utilities — Remotion has its own separate entry point
// and bundle, so without importing it explicitly here too, every reel
// renders with zero Tailwind classes applied: no colors, no absolute
// positioning, no sizing. Almost everything in these scenes depends on
// Tailwind for layout, not just color, so skipping this doesn't just look
// unstyled — whole components collapse to default block flow.
import '../index.css'

registerRoot(RemotionRoot)
