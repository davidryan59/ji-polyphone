/* eslint-disable */

export default {
  level: 2,
  contents: [
    // Oscillator
    ['Tone.Signal', 1],
    ['Tone.Gain', 256], // freq
    ['Tone.Gain', 1], // freqMult
    ['Tone.Oscillator', {frequency: 0, type: 'sine'}], // type

    // Modulator
    ['Tone.Gain', 2], // modMult
    ['Tone.Oscillator', {frequency: 0, type: 'sine'}], // modType
    ['Tone.Gain', 300], // modIndex

    // Single delay effect
    ['Tone.Gain', -1],
    ['Tone.Delay', 0.5/512, 0.250],  // delay - resonant frequency 512 Hz, multiples of 1024 Hz cancel out
    ['Tone.Gain', 1], // wet
    ['Tone.Gain', 1],
  ],
  connect: [
    [0, 1],
    [1, 2],
    [2, [3, 'frequency']],

    [1, 4],
    [4, [5, 'frequency']],
    [5, 6],
    [6, [3, 'frequency']],

    [3, 7],
    [3, 10],
    [7, 8],
    [8, 9],
    [9, 10],
  ],
  output: 10,
  api: [
    ['freq', 1, 'gain'],
    ['freqMult', 2, 'gain'],
    ['type', 3, 'type'],

    ['modMult', 4, 'gain'],
    ['modType', 5, 'type'],
    ['modIndex', 6, 'gain'],

    ['delay', 8, 'delayTime'], // to update resonant freq, use delay = 0.5 / freq
    ['wet', 9, 'gain'], // on delay effect
  ],
}
