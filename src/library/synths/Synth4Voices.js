// /* eslint-disable */

export default {
  level: 99,
  contents: [
    ['CombinedOsc', {freq: 256, gain: 1, p2:0.25, p1:0.15, p0:0.01, pEven:0.80}],
    ['FMOsc',       {freq: 256, gain: 1, type: 'triangle', modMult: 1, modType: 'sine', modIndex: 400}],
    ['FMOsc',       {freq: 256, gain: 1, type: 'triangle', modMult: 2, modType: 'sine', modIndex: 400}],
    ['CombinedOsc', {freq: 256, gain: 1, p2:0.35, p1:0.20, p0:0.01, pEven:0.20}],
    ['Tone.Gain', 0.12],  // Add effects in between here and the speakers
    'Speakers',
  ],
  connect: [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 5],
  ],
  input:  5,  // Allow additional input into speakers
  output: 5,  // Allow speakers output to be sent elsewhere
  api: [
    ['speakersGain', 5, 'gain'],
    ['speakersMinFreq', 5, 'minFreq'],

    ['freq1',     0, 'freq'     ],
    ['gain1',     0, 'gain'     ],
    ['pan1',      0, 'pan'      ],  // Could add other controls here

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
    ['gain4',     3, 'gain'     ],
    ['pan4',      3, 'pan'      ],  // Could add other controls here
  ],
}
