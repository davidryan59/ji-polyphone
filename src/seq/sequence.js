// This is a template.
// Recommend saving your own work as 'sequence.LABEL.js', which is then hidden by .gitignore.
// Can redirect App to look up that project file.

// Sequence-specific setup constants
export const sequenceSetup = {}
const c = sequenceSetup
c.beatTimeS = 0.05
c.baseFreq = 256
// Can assign several other properties too

// Sequenced chords
// [[timing], [frequencies]]
// [[timeTotalS, timeSlideS], [baseFreqHz, [relFreq1, relFreq2, relFreq3...]]]
export const polyphonySequence = [
  [[12    ],  [1/4,  [ 4, 6, 8, 10 ]] ],
  [[24, 12],  [1/4,  [ 3, 5, 9, 13 ]] ],
  [[12    ],  [1/3,  [ 2, 3, 5, 8 ]] ],
]
