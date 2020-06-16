/* eslint-disable */

// Panner Control

// Tone.Panner.pan is audioParam
// This 'Panner' uses a Tone.Gain for the pan control,
// which is a Tone.Param and behaves more nicely.

export default {
  level: 1,
  contents: [
    ['Tone.Signal', 1],
    ['Tone.Gain', 0],
    ['Tone.Panner', 0],
  ],
  connect: [
    [0, 1],
    [1, [2, 'pan']],
  ],
  input: 2,
  output: 2,
  api: [
    ['pan', 1, 'gain'],
  ],
}
