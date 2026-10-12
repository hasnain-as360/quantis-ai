import BigKinetic from '../components/BigKinetic'
import { IDX } from '../beats'

// Scene 1 (0-5000ms): the brief's "simple kinetic typography showing a
// simple problem" — literally nothing but two lines of type on a blank
// canvas, one clause at a time.
export default function ProblemScene({ index }) {
  const activeKey =
    index === IDX['s1-line1'] ? 'l1' : index === IDX['s1-line2'] ? 'l2' : null

  return (
    <BigKinetic activeKey={activeKey} accent={activeKey === 'l2' ? 'disconnected' : undefined}>
      {activeKey === 'l1' ? 'Marketing today means...' : 'juggling a dozen disconnected tools.'}
    </BigKinetic>
  )
}
