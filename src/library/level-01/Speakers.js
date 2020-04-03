export default {
  level: 1,
  contents: [
    ['Tone.Gain', 0], // Initialise with zero volume
    'Tone.Master',
  ],
  input: 0,
  output: 0,  // allows Speakers to be connected to other outputs, such as recording
  connect: [
    [0, 1],
  ],
  api: [
    ['gain', 0, 'gain'],
  ],
}
