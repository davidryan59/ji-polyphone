/* eslint-disable */

export default {
  level: 2,
  contents: [
    ['Tone.Signal', 256],               // This signal controls overall frequency
    ['Tone.Gain', {gain: 1}],
    ['OscGainPan', {freq: 0, gain: 1, type: 'sine', pan: 0}],  // Main oscillator
    ['Tone.Gain', {gain: 2}],
    ['OscGain', {freq: 0, gain: 500, type: 'sine'}],     // Modulating oscillator
  ],
  connect: [
    [0, 1],
    [1, [2, 'freq']],   // Set frequency of main oscillator
    [0, 3],
    [3, [4, 'freq']],   // Set frequency of modulator
    [4, [2, 'freq']],   // Connect modulator to main oscillator
  ],
  output: 2,
  api: [
    ['freq', 0, 'input'],
    ['freqMult', 1, 'gain'],
    ['gain', 2, 'gain'],
    ['type', 2, 'type'],
    ['pan', 2, 'pan'],
    ['modMult', 3, 'gain'],
    ['modType', 4, 'type'],
    ['modIndex', 4, 'gain'],
  ],
}
