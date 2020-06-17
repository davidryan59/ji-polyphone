/* eslint-disable */

// Make a Combined Oscillator using
// white noise and these waveforms:
// square, sawtooth, triangle, sine

export default {
  level: 2,
  contents: [
    ['Tone.Signal', 1],
    ['Tone.Gain', 256],
    ['Tone.Oscillator', {frequency: 0, type: 'sawtooth'}],
    ['Tone.Oscillator', {frequency: 0, type: 'square'}],
    ['Tone.CrossFade', 0.33],   // pEven: mix square (0) and sawtooth (1)
    ['Tone.Noise', 'white'],
    ['Tone.CrossFade', 0.01],   // p0: mix pEven (0) and noise (1)
    ['Tone.Filter', {type: 'lowpass', frequency: 20000, rolloff: -12, Q: 1}], // hiFreq
    ['Tone.Filter', {type: 'highpass', frequency: 10, rolloff: -12, Q: 1}], // loFreq
    ['Tone.Oscillator', {frequency: 0, type: 'triangle'}],
    ['Tone.CrossFade', 0.10],   // p1: mix triangle (0) and p0 (1)
    ['Tone.Oscillator', {frequency: 0, type: 'sine'}],
    ['Tone.CrossFade', 0.25],   // p2: mix sine (0) and p1 (1)
  ],
  connect: [
    [0, 1],

    [1, [2, 'frequency']],
    [1, [3, 'frequency']],
    [1, [9, 'frequency']],
    [1, [11, 'frequency']],

    [2, [4, 1]],
    [3, [4, 0]],

    [4, [6, 0]],
    [5, [6, 1]],

    [6, 7],
    [7, 8],

    [8, [10, 1]],
    [9, [10, 0]],

    [10, [12, 1]],
    [11, [12, 0]],
  ],
  output: 12,
  api: [
    ['freq', 1, 'gain'],
    ['pEven', 4, 'fade'],
    ['p0', 6, 'fade'],
    ['p1', 10, 'fade'],
    ['p2', 12, 'fade'],
    ['hiFreq', 7, 'frequency'],
    ['loFreq', 8, 'frequency'],
  ],
}
