/* eslint-disable */

export default {
  level: 99,
  contents: [
    ['FMOsc', {freq: 256, freqMult: 1, gain: 0.25, type: 'triangle', pan: 0, modMult: 2, modType: 'sine', modIndex: 0}],
    ['FMOsc', {freq: 256, freqMult: 1, gain: 0.25, type: 'triangle', pan: 0, modMult: 2, modType: 'sine', modIndex: 0}],
    ['FMOsc', {freq: 256, freqMult: 1, gain: 0.25, type: 'triangle', pan: 0, modMult: 2, modType: 'sine', modIndex: 0}],
    ['FMOsc', {freq: 256, freqMult: 1, gain: 0.25, type: 'triangle', pan: 0, modMult: 2, modType: 'sine', modIndex: 0}],
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

    ['freq1',     0, 'freq'     ],
    ['freqMult1', 0, 'freqMult' ],
    ['gain1',     0, 'gain'     ],
    ['type1',     0, 'type'     ],
    ['pan1',      0, 'pan'      ],
    ['modMult1',  0, 'modMult'  ],
    ['modType1',  0, 'modType'  ],
    ['modIndex1', 0, 'modIndex' ],

    ['freq2',     1, 'freq'     ],
    ['freqMult2', 1, 'freqMult' ],
    ['gain2',     1, 'gain'     ],
    ['type2',     1, 'type'     ],
    ['pan2',      1, 'pan'      ],
    ['modMult2',  1, 'modMult'  ],
    ['modType2',  1, 'modType'  ],
    ['modIndex2', 1, 'modIndex' ],

    ['freq3',     2, 'freq'     ],
    ['freqMult3', 2, 'freqMult' ],
    ['gain3',     2, 'gain'     ],
    ['type3',     2, 'type'     ],
    ['pan3',      2, 'pan'      ],
    ['modMult3',  2, 'modMult'  ],
    ['modType3',  2, 'modType'  ],
    ['modIndex3', 2, 'modIndex' ],

    ['freq4',     3, 'freq'     ],
    ['freqMult4', 3, 'freqMult' ],
    ['gain4',     3, 'gain'     ],
    ['type4',     3, 'type'     ],
    ['pan4',      3, 'pan'      ],
    ['modMult4',  3, 'modMult'  ],
    ['modType4',  3, 'modType'  ],
    ['modIndex4', 3, 'modIndex' ],
  ],
}
