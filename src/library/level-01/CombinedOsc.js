/* eslint-disable */

export default {
  level: 1,
  contents: [
    ['Tone.Signal', 440],
    ['Tone.Oscillator', {frequency: 0, type: 'sine', phase: 0}],
    ['Tone.Oscillator', {frequency: 0, type: 'square', phase: 0}],
    ['Tone.CrossFade', 0.5],
    ['Tone.Gain', 0.2],
    ['Tone.Panner', 0],
  ],
  connect: [
    [0, [1, 'frequency']],
    [0, [2, 'frequency']],
    [1, [3, 0]],
    [2, [3, 1]],
    [3, 4],
    [4, 5],
  ],
  output: 5,
  api: [
    ['freq', 0, 'input'],
    ['noisy', 3, 'fade'],
    ['gain', 4, 'gain'],
    ['pan', 5, 'pan'],
  ],
}
