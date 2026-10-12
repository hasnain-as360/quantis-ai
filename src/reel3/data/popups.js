import { AlertTriangle, Mail, RefreshCw, TrendingDown } from 'lucide-react'

// Scene 2's "interactive issues" — toast-style notifications, each landing
// from a different corner. Concrete symptoms of the tool-juggling problem
// stated abstractly in Scene 1.
export const POPUPS = [
  { id: 'p1', icon: AlertTriangle, text: '3 posts failed to publish', tint: 'orange', from: 'top-left' },
  { id: 'p2', icon: Mail, text: '47 unread emails', tint: 'brand', from: 'top-right' },
  { id: 'p3', icon: RefreshCw, text: 'Re-uploading to Instagram…', tint: 'purple', from: 'bottom-left' },
  { id: 'p4', icon: TrendingDown, text: 'Engagement down 12% this week', tint: 'rose', from: 'bottom-right' },
]
