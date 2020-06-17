/* eslint-disable */
import setupRamp from './setupRamp'
import setupDecay from './setupDecay'

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
  nenName: 'MixingDesk_Small',
  scaName: 'main',
  bpm: 145,
  totalBeats: 64
})

// Functions to automate creation of map objects
const addChanVol = dB => ({type: 'value', op: '+', num: dB, params: ['chanVol']})
const addChanPan = val => ({type: 'value', op: '+', num: val, params: ['chanPan']})
const multVol = dB => ({type: 'value', op: '+', num: dB, params: ['vol']})
const multFreq = num => ({type: 'value', op: '*', num: num, params: ['freq']})
const addFreq = num => ({type: 'value', op: '+', num: num, params: ['freq']})
const sendToChan = txt => ({type: 'prefixParam', prefix: `${txt}_`})


// Main synth control area
Object.assign(synthControlLibrary, {
  main: {
    level: 99,
    contents: [
      // Main loop
      {type: 'mainLoop_repeated'},

      // // Set overall volume and pan for each channel
      // // 'name' is for information only
      // // Comment out line to temporarily mute channel
      {type: 'chanVolPan', name: 'bassDrum ', maps: [addChanVol(-10), addChanPan( 0.05), sendToChan('01')]},
      {type: 'chanVolPan', name: 'toms     ', maps: [addChanVol(-10), addChanPan(-0.50), sendToChan('02')]},
      {type: 'chanVolPan', name: 'shaker   ', maps: [addChanVol(-10), addChanPan( 0.80), sendToChan('03')]},
      {type: 'chanVolPan', name: 'snare    ', maps: [addChanVol(-10), addChanPan( 0.10), sendToChan('04')]},
      {type: 'chanVolPan', name: 'bassSynth', maps: [addChanVol(-10), addChanPan(-0.05), sendToChan('05')]},
      {type: 'chanVolPan', name: 'synth1   ', maps: [addChanVol(-15), addChanPan( 0.30), sendToChan('06')]},
    ]
  },

  chanVol_0dB: { level: 1, param: 'chanVol', contents: [{v: 0}] },
  chanPan_centre: { level: 1, param: 'chanPan', contents: [{v: 0}] },
  chanVolPan: { level: 2, contents: [{type: 'chanVol_0dB'}, {type: 'chanPan_centre'}]},

  mainLoop_repeated: { level: 5, contents: [
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
    {type: 'mainLoop_32b'},
  ]},

  mainLoop_32b: { level: 4, contents: [
    {type: 'loop_bassDrum_32b', maps: [sendToChan('01')]},
    {type: 'loop_toms_32b', maps: [sendToChan('02')]},
    {type: 'loop_shaker_32b', maps: [sendToChan('03')]},
    {type: 'loop_snareDrum_32b', maps: [sendToChan('04')]},
    {type: 'test_synth_combo', maps: [sendToChan('05')]},
    {type: 'test_synth_fm', maps: [sendToChan('06')]},
  ]},


  // ------------------------------------
  // Test area for SynthCombo and SynthFM

  test_synth_combo_vol: {level:1,param:'vol',contents:[{v:0}]},
  test_synth_combo_decay: {level:1,param:'decay',contents:[{v:0}]},
  test_synth_combo_ramp: {level:1,param:'ramp',contents:[{v:1}]},

  test_synth_combo_hiFreq: {level:1,param:'hiFreq',contents:[{v:800}]},
  test_synth_combo_loFreq: {level:1,param:'loFreq',contents:[{v:10}]},
  test_synth_combo_pEven: {level:1,param:'pEven',contents:[{v:0.5}]},
  test_synth_combo_p0: {level:1,param:'p0',contents:[{v:0.00}]},
  test_synth_combo_p1: {level:1,param:'p1',contents:[{v:0.50}]},
  test_synth_combo_p2: {level:1,param:'p2',contents:[{v:0.50}]},
  test_synth_combo_freq: {level:1,param:'freq',contents:[
    {beats: 4, v:60},
    {beats: 2, v:80},
    {beats: 2, v:90},
    {beats: 4, v:120},
    {beats: 1, v:90},
    {beats: 1, v:80},
    {beats: 1, v:72},
    {beats: 1, vS:72, vE: 60},
  ]},

  test_synth_combo: { level: 2, contents: [
    {type: 'test_synth_combo_vol'},
    {type: 'test_synth_combo_decay'},
    {type: 'test_synth_combo_ramp'},
    {type: 'test_synth_combo_hiFreq'},
    {type: 'test_synth_combo_loFreq'},
    {type: 'test_synth_combo_pEven'},
    {type: 'test_synth_combo_p0'},
    {type: 'test_synth_combo_p1'},
    {type: 'test_synth_combo_p2'},
    {type: 'test_synth_combo_freq'},
  ]},

  test_synth_fm_vol: {level:1,param:'vol',contents:[{v:0}]},
  test_synth_fm_decay: {level:1,param:'decay',contents:[{v:0}]},
  test_synth_fm_ramp: {level:1,param:'ramp',contents:[{v:1}]},

  test_synth_fm_modIndex: {level:1,param:'modIndex',contents:[{v:700}]},
  // test_synth_fm_modMult: {level:1,param:'modMult',contents:[{v:2}]},
  test_synth_fm_modMult: {level:1,param:'modMult',contents:[
    {beats: 12, vS:2, vE:2},
    {beats: 3, vS:2, vE:3},
    {beats: 1, vS:3, vE:2},
  ]},
  test_synth_fm_freqMult: {level:1,param:'freqMult',contents:[{v:1}]},
  test_synth_fm_freq: {level:1,param:'freq',contents:[
    {beats: 4, v:300},
    {beats: 1, v:400},
    {beats: 1, v:500},
    {beats: 1, v:550},
    {beats: 1, v:600},
    {beats: 1, vS:600, vE:560},
    {beats: 1, vS:560, vE:450},
    {beats: 1, vS:450, vE:320},
    {beats: 1, vS:320, vE:300},
    {beats: 4, v:300},
  ]},

  test_synth_fm: { level: 2, contents: [
    {type: 'test_synth_fm_vol'},
    {type: 'test_synth_fm_ramp'},
    {type: 'test_synth_fm_decay'},
    {type: 'test_synth_fm_modIndex'},
    {type: 'test_synth_fm_modMult'},
    {type: 'test_synth_fm_freqMult'},
    {type: 'test_synth_fm_freq'},
  ]},

  // ------------------------------------


  // Ramp functions
  ramp_300us: setupRamp(0.3),
  ramp_1ms: setupRamp(1),
  ramp_voice: setupRamp(60, 300, 15, 100),

  // Decay functions - extra beats SCM is added on the end automatically
  decay_10ms_10ms: setupDecay(10, 10),
  decay_20ms_600ms: setupDecay(20, 600),
  decay_50ms_2000ms: setupDecay(50, 2000),
  decay_40000ms: setupDecay(0, 40000),

  // Frequency functions
  freq_256Hz: { level: 1, param: 'freq', contents: [{v: 256}] },

  freq_lowDrum: { level: 1, param: 'freq', contents: [
    {ms:1, vS: 800, vE: 300},
    {ms:1, vS: 300, vE: 150},
    {ms:3, vS: 150, vE: 80},
    {ms:15, vS: 80, vE: 60},
    {ms:380, vS: 60, vE: 30},
  ]},

  noise_lowDrum: { level: 1, param: 'noise', contents: [
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


  lowDrum: {
    level: 2,
    contents: [
      {type: 'freq_lowDrum'},
      {type: 'noise_lowDrum'},
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

  loop_bassDrum_32b: { level: 3, contents: [
    {type: 'lowDrum', beats: 8, maps:[multVol(-3)]},
    {type: 'lowDrum', beats: 8, maps:[multVol(-3)]},
    {type: 'lowDrum', beats: 8, maps:[multVol(-3)]},
    {type: 'lowDrum', beats: 8, maps:[multVol(-3)]},
  ]},

  loop_toms_32b: { level: 3, contents: [
    {type: 'lowDrum', beats: 3, maps:[multVol(-100)]},
    {type: 'lowDrum', beats: 3, maps:[multVol(-12), multFreq( 23/8)]},
    {type: 'lowDrum', beats: 5, maps:[multVol(-10), multFreq( 19/8)]},
    {type: 'lowDrum', beats: 3, maps:[multVol(-14), multFreq( 17/8)]},
    {type: 'lowDrum', beats: 5, maps:[multVol(-12), multFreq( 13/8)]},
    {type: 'lowDrum', beats: 3, maps:[multVol(-12), multFreq( 19/8)]},
    {type: 'lowDrum', beats: 5, maps:[multVol(-10), multFreq( 13/8)]},
    {type: 'lowDrum', beats: 3, maps:[multVol(-14), multFreq( 23/8)]},
    {type: 'lowDrum', beats: 1, maps:[multVol(-16), multFreq( 18/8)]},
    {type: 'lowDrum', beats: 1, maps:[multVol(-18), multFreq( 13/8)]},
  ]},

  loop_snareDrum_32b: { level: 3, contents: [
    {type: 'snareDrum', beats: 4, maps:[multVol(-100)]},
    {type: 'snareDrum', beats: 8, maps:[multVol(-6)]},
    {type: 'snareDrum', beats: 3, maps:[multVol(-6)]},
    {type: 'snareDrum', beats: 1, maps:[multVol(-20)]},
    {type: 'snareDrum', beats: 4, maps:[multVol(-100)]},
    {type: 'snareDrum', beats: 8, maps:[multVol(-6)]},
    {type: 'snareDrum', beats: 1, maps:[multVol(-6)]},
    {type: 'snareDrum', beats: 3, maps:[multVol(-18)]},
  ]},

  loop_shaker_32b: { level: 3, contents: [
    {type: 'shaker', beats: 1, maps:[multVol(-3)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},

    {type: 'shaker', beats: 1, maps:[multVol(-11)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},

    {type: 'shaker', beats: 1, maps:[multVol(-3)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},

    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-11)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},

    {type: 'shaker', beats: 1, maps:[multVol(-3)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},

    {type: 'shaker', beats: 1, maps:[multVol(-3)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},

    {type: 'shaker', beats: 1, maps:[multVol(-11)]},
    {type: 'shaker', beats: 1, maps:[multVol(-9)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},

    {type: 'shaker', beats: 1, maps:[multVol(-3)]},
    {type: 'shaker', beats: 1, maps:[multVol(-11)]},
    {type: 'shaker', beats: 1, maps:[multVol(-7)]},
    {type: 'shaker', beats: 1, maps:[multVol(-5)]},
  ]},
})




export default synthControls
