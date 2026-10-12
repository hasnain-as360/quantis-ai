import { COLOR, FONT } from '../theme'

export const STEPS = ['Channels', 'Schedule', 'Audience', 'Refine', 'Content', 'Create', 'Review', 'Launch']

// The 8-step wizard from ss-video.mp4. `displayStep` is computed by the
// caller (via anim.js's chaseStep) so this component stays a pure function
// of its props — no internal state, no effects, nothing that could depend
// on render order.
export default function Stepper({ displayStep }) {
  const allDone = displayStep >= STEPS.length
  const label = allDone ? null : STEPS[displayStep]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        {STEPS.map((s, i) => {
          const state = i < displayStep || allDone ? 'done' : i === displayStep ? 'active' : 'upcoming'
          return (
            <div key={s} style={{ display: 'flex', flex: i < STEPS.length - 1 ? 1 : '0 0 auto', alignItems: 'center' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: '50%',
                  border: `3px solid ${state === 'upcoming' ? COLOR.border : COLOR.brand}`,
                  background: state === 'done' ? COLOR.brand : COLOR.white,
                  color: state === 'active' ? COLOR.brand : state === 'upcoming' ? '#9AA4B2' : COLOR.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.family,
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {state === 'done' ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 3, margin: '0 4px', background: i < displayStep ? COLOR.brand : COLOR.border }} />
              )}
            </div>
          )
        })}
      </div>
      <p style={{ marginTop: 16, fontFamily: FONT.family, fontWeight: 600, fontSize: 18, color: COLOR.inkSoft }}>
        {allDone ? (
          <span style={{ color: COLOR.green }}>&#10003; All steps complete</span>
        ) : (
          <>
            Step {displayStep + 1} of {STEPS.length} <span style={{ color: COLOR.ink }}>&middot; {label}</span>
          </>
        )}
      </p>
    </div>
  )
}
