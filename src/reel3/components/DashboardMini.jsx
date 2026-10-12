import MetricCard from '../../components/MetricCard'
import { METRICS } from '../../data/metrics'

// The bento grid from SS 2/Screenshot (791).png, reusing reel 1's exact
// metric data and card component — same numbers, same accent colors, just
// laid out 3x2 instead of 2x3 since landscape has the width for it.
export default function DashboardMini({ active }) {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-3 p-4">
      {METRICS.map((m, i) => (
        <MetricCard key={m.id} metric={m} index={i} active={active} />
      ))}
    </div>
  )
}
