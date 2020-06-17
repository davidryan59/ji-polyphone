/* eslint-disable */

export default {
  Panner: require('./level-01/Panner').default,
  Speakers: require('./level-01/Speakers').default,
  Volume: require('./level-01/Volume').default,

  OscillatorCombo: require('./level-02/OscillatorCombo').default,
  OscillatorFM: require('./level-02/OscillatorFM').default,
  OscillatorPercussion: require('./level-02/OscillatorPercussion').default,
  ChannelController: require('./level-02/ChannelController').default,

  SynthCombo: require('./level-03/SynthCombo').default,
  SynthFM: require('./level-03/SynthFM').default,
  SynthPercussion: require('./level-03/SynthPercussion').default,

  MixingDesk_Simple: require('./level-10/MixingDesk_Simple').default,
  MixingDesk_Small: require('./level-10/MixingDesk_Small').default,
}
