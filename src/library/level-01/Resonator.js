/* eslint-disable */

export default {
  level: 1,
  contents: [
    ['Tone.Gain', 1],
    ['Tone.Delay', 0.5/256, 0.250],  // Resonant frequency 256 Hz, multiples of 512 Hz cancel out
    ['Tone.Gain', -1],
    ['Tone.Gain', 0.5],
    ['Tone.Panner', 0],
  ],
  connect: [
    [0, 3],
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ],
  input: 0,
  output: 4,
  api: [
    ['delay', 1, 'delayTime'],  // to update resonant freq, use delay = 0.5 / freq
    ['pan', 4, 'pan'],
  ],
}
