import { Sparkles, Share2, Users, LineChart } from 'lucide-react'

// Scene 4's interactive list — four real capabilities from the system
// context doc, each with its own `demo` kind so FeatureListItem knows what
// mini-visualization to animate in on the right.
export const FEATURES = [
  {
    id: 'ai',
    icon: Sparkles,
    title: 'AI Concept & Copy',
    desc: 'Strategy advisor and concept suggestions turn a blank page into a full campaign brief.',
    tint: 'brand',
    demo: 'typing',
  },
  {
    id: 'omni',
    icon: Share2,
    title: 'Omnichannel Publishing',
    desc: 'Email, social, and video reels — routed and scheduled from one campaign.',
    tint: 'purple',
    demo: 'channels',
  },
  {
    id: 'audience',
    icon: Users,
    title: 'Smart Audience Targeting',
    desc: 'Segment and enrich hundreds of thousands of contacts without spreadsheets.',
    tint: 'green',
    demo: 'contacts',
  },
  {
    id: 'analytics',
    icon: LineChart,
    title: 'Real-Time Analytics',
    desc: 'Opens, clicks, and reach on one bento dashboard — refreshed automatically.',
    tint: 'orange',
    demo: 'chart',
  },
]
