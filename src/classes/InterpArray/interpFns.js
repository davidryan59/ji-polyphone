// Make interpolation arrays available to interpolate smoothly (or non-smoothly for low p) between parameter values

// interpFn(p, n) returns an interpolation array with format similar to [0, 0.25, 1]
// p: power or type of interpolation
// n: length of desired array will be n+1, unless p is 0 or 1

// For p = 0, 1, 2, 4 there are special methods of interpolation:
// p=0: 0th order interpolation, return [0, 1]
// p=1: 1st order (linear) interpolation, return [0, 1]
// p=2: 2nd order interpolation, flat at start, return [0 ... t^2 ... 1] where t = k/n, k is position from 0 to n
// p=4: 2nd order interpolation (reverse), flat at end, return [0 ... 2t - t^2 ... 1] where t = k/n

// Otherwise do pth order interpolation, flat at start and end for p>=3, return [0 ... p*t^(p-1) - (p-1)*t^p ... 1], and t = k/n

export const basicInterpArray = () => [0, 1]

export const zeroToNArray = n => { const result = []; for (let i = 0; i <= n; i++) result.push(i); return result }

export const interpArrayQuad = n => zeroToNArray(n).map(k => (k / n) ** 2)

export const interpArrayPow = type => n => zeroToNArray(n).map(k => (type * (k / n) ** (type - 1) - (type - 1) * (k / n) ** type))

// p is a special case (0, 1, 2, 4) if this array is non-null at index p
const interpFnSpecialCases = [basicInterpArray, basicInterpArray, interpArrayQuad, null, interpArrayPow(2)]

export const interpFn = (p, n) => (interpFnSpecialCases[p] || interpArrayPow(p))(n)
