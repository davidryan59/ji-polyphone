/* eslint-disable */

export default {
  Panner: require('./level-01/Panner').default,
  Volume: require('./level-01/Volume').default,
  PercussionOsc: require('./level-01/PercussionOsc').default,

  OscGain: require('./level-01/OscGain').default,
  OscGainPan: require('./level-01/OscGainPan').default,
  CombinedOsc: require('./level-01/CombinedOsc').default,
  Resonator: require('./level-01/Resonator').default,
  Speakers: require('./level-01/Speakers').default,

  FMOsc: require('./level-02/FMOsc').default,
  ChannelController: require('./level-02/ChannelController').default,

  PercussionSynth: require('./level-03/PercussionSynth').default,
  OscSynth: require('./level-03/OscSynth').default,

  MixingDesk_Simple: require('./level-10/MixingDesk_Simple').default,
  MixingDesk_4Channel: require('./level-10/MixingDesk_4Channel').default,
}
