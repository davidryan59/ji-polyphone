export default {
  level: 99,
  contents: [
    ['FMOsc', {freq: 256, pan: -0.9, gain: 1, modIndex: 600, freqMult: 1, modMult: 3}],
    ['FMOsc', {freq: 256, pan: -0.3, gain: 1, modIndex: 300, freqMult: 1, modMult: 1}],
    ['FMOsc', {freq: 256, pan:  0.3, gain: 1, modIndex: 300, freqMult: 1, modMult: 1}],
    ['FMOsc', {freq: 256, pan:  0.9, gain: 1, modIndex: 500, freqMult: 1, modMult: 2}],
    'Speakers'
  ],
  connect: [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
  ],
  input:  4,  // Allow additional input before the master gain
  output: 4,  // Allow additional output after the master gain
  api: [
    ['masterGain', 4, 'gain'],

    ['freq1', 0, 'freq'],
    ['type1', 0, 'type'],
    ['gain1', 0, 'gain'],
    [ 'pan1', 0,  'pan'],

    ['freq2', 1, 'freq'],
    ['type2', 1, 'type'],
    ['gain2', 1, 'gain'],
    [ 'pan2', 1,  'pan'],

    ['freq3', 2, 'freq'],
    ['type3', 2, 'type'],
    ['gain3', 2, 'gain'],
    [ 'pan3', 2,  'pan'],

    ['freq4', 3, 'freq'],
    ['type4', 3, 'type'],
    ['gain4', 3, 'gain'],
    [ 'pan4', 3,  'pan'],
  ],
}
