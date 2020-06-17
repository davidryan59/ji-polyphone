// Make a setup object for a ramp function

const defaultMs = 50
const minMs = 0.1

// Example usage:

// setupRamp(10) gives:
// {
//   level: 1,
//   param: 'ramp',
//   squash: true,
//   contents: [
//     {ms: 10, vs:0, ve:1},
//     {v: 1},
//     {ms: 10, vs:1, ve:0},
//   ]
// }

// setupRamp(20, 30) gives:
// {
//   level: 1,
//   param: 'ramp',
//   squash: true,
//   contents: [
//     {ms: 20, vs:0, ve:1},
//     {v: 1},
//     {ms: 30, vs:1, ve:0},
//   ]
// }

// setupRamp(20, 40, 10)
// Contents ramp up and down by 10 ms, via quadratic curve
// Contents have 2 items up, 1 item at top of ramp, 4 items down

// setupRamp(20, 40, 5, 10)
// Contents ramp up by 5ms, down by 10 ms, via quadratic curve
// Contents have 4 items up and down

const checkMs = input => (Number.isFinite(input) && minMs <= input) ? input : defaultMs
const quadRamp = (num, lim) => 1 - ((lim-num)/lim) ** 2
const setupRamp = (inputMs, inputEndMs, inputStepMs, inputEndStepMs) => {
  const result = {}
  result.level = 1
  result.param = 'ramp'
  result.squash = true
  result.contents = []
  const startMs = checkMs(inputMs)
  const endMs = checkMs(inputEndMs || inputMs)
  const startStepMs = checkMs(inputStepMs)
  const endStepMs = checkMs(inputEndStepMs || inputStepMs)
  const startSteps = Math.ceil(startMs / startStepMs)
  const endSteps = Math.ceil(endMs / endStepMs)
  for (let i=0; i<startSteps; i += 1) {
    result.contents.push({
      ms: startMs / startSteps,
      vs: quadRamp(i, startSteps),
      ve: quadRamp(i+1, startSteps),
    })
  }
  result.contents.push({v: 1})
  for (let i=0; i<endSteps; i += 1) {
    result.contents.push({
      ms: endMs / endSteps,
      vs: quadRamp(endSteps - i, endSteps),
      ve: quadRamp(endSteps - i - 1, endSteps),
    })
  }
  return result
}

export default setupRamp
