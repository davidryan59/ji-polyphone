// Make a setup object for a decay function
// Decay time is time from 0 dB to -100 dB
// (Amplitude 0.1 is -20 dB)

const defaultMs = 2000
const minMs = 0.1

// Example usage:

// setupDecay(0, 34500) gives:
// {
//   level: 1,
//   param: 'decay',
//   contents [
//     {ms: 34500, vs: 0, ve: -100}
//   ]
// }

// setupDecay(17, 623) gives:
// {
//   level: 1,
//   param: 'decay',
//   contents [
//     {ms: 17, v: 0},
//     {ms: 623, vs: 0, ve: -100}
//   ]
// }

const setupDecay = (levelMs, inputDecayMs) => {
  const result = {}
  result.level = 1
  result.param = 'decay'
  result.contents = []
  if (Number.isFinite(levelMs) && minMs < levelMs) {
    result.contents.push({
      ms: levelMs,
      v: 0
    })
  }
  const decayMs = (Number.isFinite(inputDecayMs) && minMs < inputDecayMs) ? inputDecayMs : defaultMs
  result.contents.push({
    ms: decayMs,
    vs: 0,
    ve: -100
  })
  return result
}

export default setupDecay
