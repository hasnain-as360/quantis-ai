import { COLOR } from '../theme'
import LogoReveal from '../components/LogoReveal'

export default function Scene5_Outro() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLOR.canvas }}>
      <LogoReveal start={0} width={300} showTagline topLabel={undefined} />
    </div>
  )
}
