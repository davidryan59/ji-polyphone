/* eslint-disable */

export default {
  level: 3,
  contents: [
    ['Tone.Oscillator', 256, 'triangle'],
    'ChannelController',
  ],
  connect: [
    [0, 1],
  ],
  output: 1,
  api: [
    ['freq', 0, 'frequency'],
    ['type', 0, 'type'],

    ['vol', 1, 'vol'],
    ['decay', 1, 'decay'],
    ['ramp', 1, 'ramp'],
    ['chanVol', 1, 'chanVol'],
    ['chanPan', 1, 'chanPan'],
  ],
}
