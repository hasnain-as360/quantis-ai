import { Send, CheckCircle2, Eye, MousePointerClick, Users, Globe } from 'lucide-react'

// Straight from SS/Screenshot (779).png — the real Precision dashboard bento
// grid (Loan Fitter workspace, "7d" view). Card order, labels, values, and
// accent colors (blue / green / blue / purple / green / orange) match the
// screenshot exactly.
export const METRICS = [
  {
    id: 'emails',
    label: 'Emails Sent',
    value: '28,633',
    delta: '+37.6% vs prev',
    deltaTone: 'up',
    tint: 'brand',
    icon: Send,
  },
  {
    id: 'delivery',
    label: 'Delivery Rate',
    value: '67.3%',
    delta: '+0.5% vs prev',
    deltaTone: 'up',
    tint: 'green',
    icon: CheckCircle2,
  },
  {
    id: 'open',
    label: 'Open Rate',
    value: '9.1%',
    delta: '+47.2% vs prev',
    deltaTone: 'up',
    tint: 'brand',
    icon: Eye,
  },
  {
    id: 'click',
    label: 'Click Rate',
    value: '6.8%',
    delta: '+45.6% vs prev',
    deltaTone: 'up',
    tint: 'purple',
    icon: MousePointerClick,
  },
  {
    id: 'leads',
    label: 'Leads Generated',
    value: '0',
    delta: '0.0% vs prev',
    deltaTone: 'flat',
    tint: 'green',
    icon: Users,
  },
  {
    id: 'reach',
    label: 'Social Reach',
    value: '0',
    delta: '0.0% vs prev',
    deltaTone: 'flat',
    tint: 'orange',
    icon: Globe,
  },
]
