/* eslint-disable */

export default {
  level: 2,
  contents: [
    ['Tone.Noise', 'white'],
    ['Tone.Filter', {type: 'lowpass', frequency: 20000, rolloff: -12, Q: 1}], // Control highest noise frequency
    ['Tone.Filter', {type: 'highpass', frequency: 10, rolloff: -12, Q: 1}], // Control lowest noise frequency
    ['Tone.Oscillator', {frequency: 256, type: 'sine'}],
    ['Tone.CrossFade', 0.02],
  ],
  connect: [
    [0, 1],
    [1, 2],
    [2, [4, 1]],
    [3, [4, 0]],
  ],
  output: 4,
  api: [
    ['hiFreq', 1, 'frequency'],
    ['loFreq', 2, 'frequency'],
    ['freq', 3, 'frequency'],
    ['noise', 4, 'fade'],
  ],
}
