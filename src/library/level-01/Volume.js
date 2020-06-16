/* eslint-disable */

// Volume Control

// API is single Param 'dB', which is a volume from -100 dB to 0 dB
// 0 dB is gain 1
// -20 dB is gain 0.1
// -40 dB is gain 0.01
// -60 dB is gain 0.001
// -80 dB is gain 0.0001
// -100 dB is gain 0 (tweaked from 0.00001)

// 10 ** 0.25 = 1.77827941...
// 10 ** 0.5  = 3.1622776602....
// 10 ** 0.25 = 5.6234132519...

// Array to map [-1, 1] to [0, 1] approximately exponentially
const dBarray = [
  0, // replaces 1/100000, to make gain = 0 at dB = -100
  1/56234, 1/31622, 1/17782, 1/10000,
  10/56234, 10/31622, 10/17782, 10/10000,
  100/56234, 100/31622, 100/17782, 100/10000,
  1000/56234, 1000/31622, 1000/17782, 1000/10000,
  10000/56234, 10000/31622, 10000/17782, 10000/10000,
]

export default {
  level: 1,
  contents: [
    ['Tone.Signal', 1],
    ['Tone.Gain', 0], // input dB between -100 and 0 here
    ['Tone.Add', 50], // -50 to +50
    ['Tone.Multiply', 0.02], // -1 to +1
    ['Tone.WaveShaper', [dBarray]], // 0 to 1
    ['Tone.Gain', 1/1], // input and output on this node
  ],
  connect: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, [5, 'gain']],
  ],
  input: 5,
  output: 5,
  api: [
    ['vol', 1, 'gain'], // volume in dB between -100 dB and 0 dB
  ],
}
