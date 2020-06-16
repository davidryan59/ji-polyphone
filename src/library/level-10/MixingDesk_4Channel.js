// /* eslint-disable */

export default {
  level: 10,
  contents: [
    'Speakers',
    'PercussionSynth',
    'PercussionSynth',
    'PercussionSynth',
    'OscSynth',
  ],
  connect: [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ],
  input: 0,
  output: 0,
  api: [
    {replicate: 0, prefix: 'speakers_'},
    {replicate: 1, prefix: '01_'},
    {replicate: 2, prefix: '02_'},
    {replicate: 3, prefix: '03_'},
    {replicate: 4, prefix: '04_'},
  ]
}
