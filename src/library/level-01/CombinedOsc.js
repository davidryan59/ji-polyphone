/* eslint-disable */

export default {
  level: 1,
  contents: [
    ['Tone.Signal', 256],
    ['Tone.Oscillator', {frequency: 0, type: 'sine', phase: 0}],
    ['Tone.Oscillator', {frequency: 0, type: 'triangle', phase: 0}],
    ['Tone.Oscillator', {frequency: 0, type: 'square', phase: 0}],
    ['Tone.Oscillator', {frequency: 0, type: 'sawtooth', phase: 0}],
    ['Tone.Noise', 'white'],
    ['Tone.CrossFade', 0.33],   // pEven: mix square (0) and sawtooth (1)
    ['Tone.CrossFade', 0.01],   // p0: mix pEven (0) and noise (1)
    ['Tone.CrossFade', 0.10],   // p1: mix triangle (0) and p0 (1)
    ['Tone.CrossFade', 0.25],   // p2: mix sine (0) and p1 (1)
    ['Tone.Gain', 1],
    ['Tone.Panner', 0],
  ],
  connect: [
    [0, [1, 'frequency']],
    [0, [2, 'frequency']],
    [0, [3, 'frequency']],
    [0, [4, 'frequency']],
    [3, [6, 0]],
    [4, [6, 1]],
    [6, [7, 0]],
    [5, [7, 1]],
    [2, [8, 0]],
    [7, [8, 1]],
    [1, [9, 0]],
    [8, [9, 1]],
    [9, 10],
    [10, 11],
  ],
  output: 11,
  api: [
    ['freq', 0, 'input'],
    ['gain', 10, 'gain'],
    ['pan', 11, 'pan'],
    ['pEven', 6, 'fade'],
    ['p0', 7, 'fade'],
    ['p1', 8, 'fade'],
    ['p2', 9, 'fade'],
  ],
}
