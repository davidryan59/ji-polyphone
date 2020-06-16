/* eslint-disable */

export default {
  level: 2,
  contents: [
    ['Tone.Gain', 1], // 'ramp' control attack and release (between 0 and 1)
    ['Volume', {vol: 0}], // 'vol' dB control, from -100 dB (silent) to 0 dB (full amplitude)
    ['Panner', {pan: 0}], // 'chanPan', pan to left (-1), centre (0), right (1)

    ['Tone.Signal', 1],
    ['Tone.Gain', 0], // 'decay' extra dB control
    ['Tone.Gain', 0], // 'chanVol extra dB control'
  ],
  connect: [
    [0, 1],
    [1, 2],

    [3, 4],
    [3, 5],

    [4, [1, 'vol']],
    [5, [1, 'vol']],
  ],
  input: 0,
  output: 2,
  api: [
    ['ramp', 0, 'gain'],
    ['vol', 1, 'vol'], // For extra volume / dB controls, connect them here
    ['decay', 4, 'gain'],
    ['chanVol', 5, 'gain'],
    ['chanPan', 2, 'pan'],
  ],
}
