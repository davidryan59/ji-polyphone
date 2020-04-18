/* eslint-disable */

// This is a template.
// Recommend saving your own work as 'sequence.LABEL.js', which is then hidden by .gitignore.
// Can redirect App to look up that project file.


// Sequence-specific setup constants
const c = {}
c.synthType = 'Synth4Voices'
c.synthInit = {}
c.beatLenS = 0.05
c.baseFreq = 256
// Can assign several other properties too, see defaultConstants


// Sequenced chords
// [[timing], [frequencies]]
// [[timeTotalS, timeSlideS], [baseFreqHz, [relFreq1, relFreq2, relFreq3...]]]
const sequenceData = [
  [[12, 6 ],  [2/8,  [ 2, 6, 8, 10 ]] ],
  [[12    ],  [2/6,  [ 3, 5, 6, 8 ]] ],
  [[6     ],  [2/9,  [ 4, 6, 8, 10 ]] ],
  [[6     ],  [2/8,  [ 3, 6, 8, 10 ]] ],
  [[24, 12],  [2/8,  [ 2.75, 7, 9, 11 ]] ],
  [[12    ],  [2/6,  [ 1, 3, 5, 8 ]] ],
]


export default {
  constants: c,
  data: sequenceData
}
