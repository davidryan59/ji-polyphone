export default {
  level: 2,
  contents: [
    ['Tone.Signal', {value: 1}],
    ['Tone.Gain', {gain: 256}],           // This gain controls overall frequency

    ['Tone.Gain', {gain: 1}],
    ['OscGainPan', {freq: 0, gain: 1, type: 'sine', pan: 0}],  // Main oscillator

    ['Tone.Gain', {gain: 2}],
    ['OscGain', {freq: 0, gain: 500, type: 'sine'}],     // Modulating oscillator
  ],
  connect: [
    [0, 1],             // Signal to main frequency

    [1, 2],
    [2, [3, 'freq']],   // Set frequency of main oscillator

    [1, 4],
    [4, [5, 'freq']],   // Set frequency of modulator

    [5, [3, 'freq']],   // Connect modulator to main oscillator
  ],
  output: 3,
  api: [
    ['freq', 1, 'gain'],
    ['freqMult', 2, 'gain'],
    ['gain', 3, 'gain'],
    ['type', 3, 'type'],
    ['pan', 3, 'pan'],

    ['modMult', 4, 'gain'],
    ['modType', 5, 'type'],
    ['modIndex', 5, 'gain'],
  ],
}
