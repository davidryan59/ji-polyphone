/* eslint-disable */

export default {
  level: 1,
  contents: [
    ['Tone.Oscillator', 256, 'triangle'],
    ['Tone.Gain', 1],
    ['Tone.Panner', 0],
  ],
  connect: [
    [0, 1],
    [1, 2],
  ],
  output: 2,
  api: [
    ['freq', 0, 'frequency'],
    ['type', 0, 'type'],
    ['gain', 1, 'gain'],
    ['pan', 2, 'pan'],
  ],
}
