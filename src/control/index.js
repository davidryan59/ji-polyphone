/* eslint-disable */

const nestedAudioNodeLibrary = require('../library').default
const synthControlLibrary = {} // will add to this below
const defaults = {}
const synthControls = {
  scaLibrary: synthControlLibrary,
  nenLibrary: nestedAudioNodeLibrary,
  defaults: defaults
}

// Control which NEN and SCA get created
// Can override any other default options too
Object.assign(defaults, {
  nenName: 'MixingDesk_4Channel',
  scaName: 'main',
  bpm: 145,
  totalBeats: 16
})

const qr = (num, lim) => 1 - ((lim-num)/lim) ** 2 // quadratic ramp function

const vol = dB => ({type: 'value', op: '+', num: dB, params: ['vol']})
const freq = mult => ({type: 'value', op: '*', num: mult, params: ['freq']})

// Control of synthesizer parameters over time
Object.assign(synthControlLibrary, {
  main: {
    level: 99,
    contents: [
      {type: 'mainLoop'},
      {type: 'mainLoop'},
    ]
  },

  // Ramp functions
  ramp_300us: {
    level: 1,
    param: 'ramp',
    squash: true,
    contents: [
      {ms: 0.3, vs:0, ve:1},
      {v: 1},
      {ms: 0.3, vs:1, ve:0},
    ]
  },
  ramp_1ms: {
    level: 1,
    param: 'ramp',
    squash: true,
    contents: [
      {ms: 1, vs:0, ve:1},
      {v: 1},
      {ms: 1, vs:1, ve:0},
    ]
  },
  ramp_10ms: {
    level: 1,
    param: 'ramp',
    squash: true,
    contents: [
      {ms: 10, vs:0, ve:1},
      {v: 1},
      {ms: 10, vs:1, ve:0},
    ]
  },
  ramp_60ms_150_smooth: {
    level: 1,
    param: 'ramp',
    squash: true, // Two modes for SCA on SCM: truncate (default) and squash
    contents: [ // Two modes for SCM: beats (default) and ms
      {ms: 20, vs: qr(0, 3), ve: qr(1, 3) },
      {ms: 20, vs: qr(1, 3), ve: qr(2, 3) },
      {ms: 20, vs: qr(2, 3), ve: qr(3, 3) },
      {v: 1},
      {ms: 50, vs: qr(3, 3), ve: qr(2, 3) },
      {ms: 50, vs: qr(2, 3), ve: qr(1, 3) },
      {ms: 50, vs: qr(1, 3), ve: qr(0, 3) },
    ]
  },

  // Decay functions - extra beats SCM is added on the end automatically
  decay_10ms_10ms: { level: 1, param: 'decay', contents: [{ms: 10, v: 0}, {ms: 10, vs: 0, ve: -100}] },
  decay_20ms_600ms: { level: 1, param: 'decay', contents: [{ms: 20, v: 0}, {ms: 600, vs: 0, ve: -100}] },
  decay_50ms_2000ms: { level: 1, param: 'decay', contents: [{ms: 50, v: 0}, {ms: 2000, vs: 0, ve: -100}] },
  decay_10ms_40000ms: { level: 1, param: 'decay', contents: [{ms: 10, v: 0}, {ms: 40000, vs: 0, ve: -100}] },

  // Frequency functions
  freq_256Hz: { level: 1, param: 'freq', contents: [{v: 256}] },

  freq_bassDrumCurve: { level: 1, param: 'freq', contents: [
    {ms:1, vS: 800, vE: 300},
    {ms:1, vS: 300, vE: 150},
    {ms:3, vS: 150, vE: 80},
    {ms:15, vS: 80, vE: 60},
    {ms:380, vS: 60, vE: 30},
  ]},

  noise_bassDrumCurve: { level: 1, param: 'noise', contents: [
    {ms:3, vS: 0.000, vE: 0.010},
    {ms:7, vS: 0.010, vE: 0.003},
    {ms:15, vS: 0.003, vE: 0.000},
    {ms:375, vS: 0.000, vE: 0.000},
  ]},

  freq_snareDrumCurve: { level: 1, param: 'freq', contents: [
    {ms:50, vS: 300, vE: 50},
    {ms:50, vS: 50, vE: 600},
  ]},

  noise_snareDrumCurve: { level: 1, param: 'noise', contents: [
    {ms:20, vS: 0.500, vE: 0.870},
    {ms:80, vS: 0.870, vE: 1.000},
  ]},

  hiFreq_shakerCurve: { level: 1, param: 'hiFreq', contents: [{ms: 10, vS: 22000, vE: 20000}]},
  freq_shakerCurve: { level: 1, param: 'freq', contents: [{ms:10, vS: 15000, vE: 17000}]},
  loFreq_shakerCurve: { level: 1, param: 'loFreq', contents: [{ms:10, vS: 14000, vE: 15000}]},
  noise_shakerCurve: { level: 1, param: 'noise', contents: [{ms:10, vS: 0.500, vE: 1.000}]},

  vol_0_dB: { level: 1, param: 'vol', contents: [{v: 0}] },
  vol_neg_6_dB: { level: 1, param: 'vol', contents: [{v: -6}] },
  vol_neg_100_dB: { level: 1, param: 'vol', contents: [{v: -100}] },

  noise_0pc: { level: 1, param: 'noise', contents: [{v: 0}] },
  noise_1pc: { level: 1, param: 'noise', contents: [{v: 0.01}] },
  hiFreq_20kHz: { level: 1, param: 'hiFreq', contents: [{v:20000}] },
  loFreq_10Hz: { level: 1, param: 'loFreq', contents: [{v:10}] },

  bassDrum: {
    level: 2,
    contents: [
      {type: 'freq_bassDrumCurve'},
      {type: 'noise_bassDrumCurve'},
      {type: 'decay_50ms_2000ms'},
      {type: 'ramp_1ms'},
      {type: 'vol_0_dB'},
      {type: 'hiFreq_20kHz'},
      {type: 'loFreq_10Hz'},
    ]
  },
  snareDrum: {
    level: 2,
    contents: [
      {type: 'freq_snareDrumCurve'},
      {type: 'noise_snareDrumCurve'},
      {type: 'decay_20ms_600ms'},
      {type: 'ramp_1ms'},
      {type: 'vol_neg_6_dB'},
      {type: 'hiFreq_20kHz'},
      {type: 'loFreq_10Hz'},
    ]
  },
  shaker: {
    level: 2,
    contents: [
      {type: 'freq_shakerCurve'},
      {type: 'noise_shakerCurve'},
      {type: 'decay_10ms_10ms'},
      {type: 'ramp_300us'},
      {type: 'vol_0_dB'},
      {type: 'hiFreq_shakerCurve'},
      {type: 'loFreq_shakerCurve'},
    ]
  },
  voice_256Hz: {
    level: 2,
    contents: [
      {type: 'freq_256Hz'},
      {type: 'vol_0_dB'},
      {type: 'decay_10ms_40000ms'},
      {type: 'ramp_60ms_150_smooth'},
    ]
  },

  loop_bassDrum_32b: { level: 3, contents: [
    {type: 'bassDrum', beats: 4, maps:[vol(-3), freq( 8/8)]},
    {type: 'bassDrum', beats: 4, maps:[vol(-6), freq(16/8)]},
    {type: 'bassDrum', beats: 4, maps:[vol(-3), freq( 8/8)]},
    {type: 'bassDrum', beats: 4, maps:[vol(-6), freq(12/8)]},
    {type: 'bassDrum', beats: 4, maps:[vol(-3), freq( 8/8)]},
    {type: 'bassDrum', beats: 4, maps:[vol(-9), freq(32/8)]},
    {type: 'bassDrum', beats: 4, maps:[vol(-3), freq( 8/8)]},
    {type: 'bassDrum', beats: 2, maps:[vol(-7), freq(24/8)]},
    {type: 'bassDrum', beats: 1, maps:[vol(-8), freq(16/8)]},
    {type: 'bassDrum', beats: 1, maps:[vol(-9), freq(12/8)]},
  ]},

  loop_snareDrum_32b: { level: 3, contents: [
    {type: 'snareDrum', beats: 4, maps:[vol(-100)]},
    {type: 'snareDrum', beats: 8, maps:[vol(-6)]},
    {type: 'snareDrum', beats: 3, maps:[vol(-6)]},
    {type: 'snareDrum', beats: 1, maps:[vol(-20)]},
    {type: 'snareDrum', beats: 4, maps:[vol(-100)]},
    {type: 'snareDrum', beats: 8, maps:[vol(-6)]},
    {type: 'snareDrum', beats: 1, maps:[vol(-6)]},
    {type: 'snareDrum', beats: 3, maps:[vol(-18)]},
  ]},

  loop_shaker_32b: { level: 3, contents: [
    {type: 'shaker', beats: 1, maps:[vol(-3)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},

    {type: 'shaker', beats: 1, maps:[vol(-11)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},

    {type: 'shaker', beats: 1, maps:[vol(-3)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},

    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-11)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},

    {type: 'shaker', beats: 1, maps:[vol(-3)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},

    {type: 'shaker', beats: 1, maps:[vol(-3)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},

    {type: 'shaker', beats: 1, maps:[vol(-11)]},
    {type: 'shaker', beats: 1, maps:[vol(-9)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},

    {type: 'shaker', beats: 1, maps:[vol(-3)]},
    {type: 'shaker', beats: 1, maps:[vol(-11)]},
    {type: 'shaker', beats: 1, maps:[vol(-7)]},
    {type: 'shaker', beats: 1, maps:[vol(-5)]},

  ]},

  loop_voice_32b: { level: 3, contents: [
    {type: 'voice_256Hz', beats: 2, maps:[freq(12/12), vol(-5)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(13/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(15/12), vol(-9)]},
    {type: 'voice_256Hz', beats: 2, maps:[freq(16/12), vol(-10)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(18/12), vol(-8)]},
    {type: 'voice_256Hz', beats: 2, maps:[freq(21/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(20/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 2, maps:[freq(23/12), vol(-5)]},
    {type: 'voice_256Hz', beats: 4, maps:[freq(24/12), vol(-5)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(25/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(23/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(21/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(24/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(22/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(20/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(24/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(22/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(20/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(23/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(21/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(19/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(22/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(20/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(18/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(21/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(18/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(15/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(20/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(17/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(14/12), vol(-7)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(19/12), vol(-4)]},
    {type: 'voice_256Hz', beats: 1, maps:[freq(16/12), vol(-6)]},
    {type: 'voice_256Hz', beats: 7, maps:[freq(12/12), vol(-7)]},
  ]},


  mainLoop: { level: 4, contents: [
    {type: 'loop_bassDrum_32b', maps: [{type: 'prefixParam', prefix: '01_'}]},
    {type: 'loop_snareDrum_32b', maps: [{type: 'prefixParam', prefix: '02_'}]},
    {type: 'loop_shaker_32b', maps: [{type: 'prefixParam', prefix: '03_'}]},
    {type: 'loop_voice_32b', maps: [{type: 'prefixParam', prefix: '04_'}]},
  ]},

})




export default synthControls
