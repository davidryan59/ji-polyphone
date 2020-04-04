/* eslint-disable */

export default {
  level: 1,
  contents: [
    ['Tone.Oscillator', 256, 'triangle'],
    ['Tone.Gain', 1],
  ],
  connect: [
    [0, 1],
  ],
  output: 1,
  api: [
    ['freq', 0, 'frequency'],
    ['type', 0, 'type'],
    ['gain', 1, 'gain'],
  ],
}
