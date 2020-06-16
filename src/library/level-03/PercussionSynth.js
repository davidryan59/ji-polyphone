/* eslint-disable */

export default {
  level: 3,
  contents: [
    'PercussionOsc',
    'ChannelController',
  ],
  connect: [
    [0, 1],
  ],
  output: 1,
  api: [
    ['hiFreq', 0, 'hiFreq'],
    ['loFreq', 0, 'loFreq'],
    ['freq', 0, 'freq'],
    ['noise', 0, 'noise'],

    ['vol', 1, 'vol'],
    ['decay', 1, 'decay'],
    ['ramp', 1, 'ramp'],
    ['chanVol', 1, 'chanVol'],
    ['chanPan', 1, 'chanPan'],
  ],
}
