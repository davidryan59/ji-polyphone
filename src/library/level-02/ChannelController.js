/* eslint-disable */

// ChannelController
// Provides controls for volume and panning of a channel

// Recommended usage:

// Note-level controls
// - vol: Make note louder or quieter, in dB
// - decay: Make note volume decay, 0 dB at start, -100 dB at end
// - ramp: Use to fade in (0 to 1) at note start, and out (1 to 0) at note end
//         Should use this to hide any discontinuities, e.g. in frequency or volume

// Intermediate-level controls
// - fadeVol: Any slow variations in channel volume, fading in and out, in dB

// Channel-level controls:
// - chanPan: Pan channel from -1.00 (left) to 0.00 (middle) to 1.00 (right)
// - chanVol: Set overall channel volume in the mix, from -100 dB to 0 dB
//            0 dB is full amplitude = 1; -100 dB is approx zero amplitude = 0
//            Also use chanVol = -100 dB (default) to mute a channel

// If any more dB controls are needed, connect them into chanVol

export default {
  level: 2,
  contents: [
    ['Tone.Gain', 1], // ramp (amplitude, 0 to 1)
    ['Volume', {vol: -100}], // chanVol (dB, -100 to 0)
    ['Panner', {pan: 0}], // chanPan (-1.00 to 0.00 to 1.00)

    ['Tone.Signal', 1],
    ['Tone.Gain', 0], // decay (dB, 0 at start to -100 at end)
    ['Tone.Gain', 0], // vol (dB, -40 to +10)
    ['Tone.Gain', 0], // fadeVol (dB, -100 to +10)
  ],
  connect: [
    [0, 1],
    [1, 2],

    [3, 4],
    [4, [1, 'vol']],

    [3, 5],
    [5, [1, 'vol']],

    [3, 6],
    [6, [1, 'vol']],
  ],
  input: 0,
  output: 2,
  api: [
    ['ramp', 0, 'gain'],
    
    ['decay', 4, 'gain'],

    ['vol', 5, 'gain'],
    ['fadeVol', 6, 'gain'],
    ['chanVol', 1, 'vol'],

    ['chanPan', 2, 'pan'],
  ],
}
