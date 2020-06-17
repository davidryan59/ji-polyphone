// /* eslint-disable */

export default {
  level: 10,
  contents: [
    'Speakers',
    'SynthPercussion',
    'SynthPercussion',
    'SynthPercussion',
    'SynthPercussion',
    'SynthCombo',
    'SynthFM',
  ],
  connect: [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
  ],
  input: 0,
  output: 0,
  api: [
    {copy: 0, prefix: 'speakers_'},
    {copy: 1, prefix: '01_'},
    {copy: 2, prefix: '02_'},
    {copy: 3, prefix: '03_'},
    {copy: 4, prefix: '04_'},
    {copy: 5, prefix: '05_'},
    {copy: 6, prefix: '06_'},
  ]
}
