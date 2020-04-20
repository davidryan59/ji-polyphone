// /* eslint-disable */

export default {
  level: 99,
  contents: [
    ['Tone.Signal', 256],
    ['Tone.Gain',   {gain: 1}],
    ['Tone.Gain',   {gain: 1}],
    ['Tone.Gain',   {gain: 1}],
    ['Tone.Gain',   {gain: 1}],
    ['CombinedOsc', {freq: 0, gain: 1, p2:0.25, p1:0.15, p0:0.01, pEven:0.80}],
    ['FMOsc',       {freq: 0, gain: 1, type: 'triangle', modMult: 1, modType: 'sine', modIndex: 400}],
    ['FMOsc',       {freq: 0, gain: 1, type: 'triangle', modMult: 2, modType: 'sine', modIndex: 400}],
    ['CombinedOsc', {freq: 0, gain: 1, p2:0.35, p1:0.20, p0:0.01, pEven:0.20}],
    ['Tone.Gain', 0.12],  // Add effects in between here and the speakers
    'Speakers'
  ],
  connect: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],

    [1, [5, 'freq']],
    [2, [6, 'freq']],
    [3, [7, 'freq']],
    [4, [8, 'freq']],

    [5, 9],
    [6, 9],
    [7, 9],
    [8, 9],
    [9, 10],
  ],
  input:  10,  // Allow additional input into speakers
  output: 10,  // Allow speakers output to be sent elsewhere
  api: [
    ['speakersGain',    10, 'gain'   ],
    ['speakersMinFreq', 10, 'minFreq'],

    ['baseFreq',  0, 'input'],

    ['f1',        1, 'gain' ],
    ['f2',        2, 'gain' ],
    ['f3',        3, 'gain' ],
    ['f4',        4, 'gain' ],

    ['g1',        5, 'gain' ],
    ['g2',        6, 'gain' ],
    ['g3',        7, 'gain' ],
    ['g4',        8, 'gain' ],

    ['p1',        5, 'pan'  ],
    ['p2',        6, 'pan'  ],
    ['p3',        7, 'pan'  ],
    ['p4',        8, 'pan'  ],
  ],
}
