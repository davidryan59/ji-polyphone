/* eslint-disable */

const resFreq = 18.384732  // Choose a random frequency around 20 Hz to be incommensurate with other freqs

export default {
  level: 1,
  contents: [
    ['Tone.Gain', 0],                          // Initialise with zero volume
    ['Tone.Filter', resFreq, 'highpass', -12], // Remove any DC in the signal
    'Tone.Master',
  ],
  input: 0,
  output: 1, // allows connections to other items, such as recorders
  connect: [
    [0, 1],
    [1, 2],
  ],
  api: [
    ['gain', 0, 'gain'],
    ['minFreq', 1, 'frequency'],
  ],
}
