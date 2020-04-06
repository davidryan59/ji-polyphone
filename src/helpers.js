export const doNothing = () => {}

export const isObject = val => {
  if (val === null) { return false }
  return ((typeof val === 'function') || (typeof val === 'object'))
}

export const isArray = val => Array.isArray(val)

export const isArrayOrObject = val => isArray(val) || isObject(val)

export const isArrayIndex = val => Number.isInteger(val) || val >= 0

export const disp = val => JSON.stringify(val)

export const arrayIndexPopulated = (array, idx) => isArray(array) && array[idx] != null

export const isAudioParam = item => {
  // Does this item implement the Web Audio API for a-rate (or k-rate) parameters?
  return !!(item && item.setValueAtTime && item.setValueAtTime.call)
  // Use setValueAtTime as the marker for this API...
}

// Make interpolation arrays available to interpolate smoothly (or non-smoothly) between parameter values
// Use: interpArray = (start, end, type, n)
// start = starting value, end = ending value, n is number of points. Here are the five values for type:
// 0: Zero interpolation (jumps at end of array, not smooth)
// 1: Linear interpolation (smooth fn, non-smooth derivative)
// 2: Quadratic at start (smooth fn, derivative smooth at start)
// 3: Cubic (smooth fn, smooth derivative everywhere)
// 4: Quadratic (smoogh fn, derivative smooth at END)
// 5 and above: Smooth at start and end, moving increasingly slowly at start
const [td, sd, ed, nd] = [5, 0, 1, 32] // DEFAULTS
const zeroToNArray = n => { const result = []; for (let i = 0; i <= n; i++) result.push(i); return result }
const interpArrayZero = (start = sd, end = ed, n = nd) => zeroToNArray(n).map(k => start + (end - start) * ((k < n) ? 0 : 1))
const interpArrayLinear = (start = sd, end = ed, n = nd) => zeroToNArray(n).map(k => start + (end - start) * k / n)
const interpArrayQuad = (start = sd, end = ed, n = nd) => zeroToNArray(n).map(k => start + (end - start) * (k / n) ** 2)
const interpArrayPow = (type = td) => (start = sd, end = ed, n = nd) => zeroToNArray(n).map(k =>
  start + (end - start) * (type * (k / n) ** (type - 1) - (type - 1) * (k / n) ** type)
)
const interpFnsArray = [interpArrayZero, interpArrayLinear, interpArrayQuad, interpArrayPow(3), interpArrayPow(2)]
export const interpArray = (type, start, end, n) => (interpFnsArray[type] || interpArrayPow(type))(start, end, n)
