/* eslint-disable */

const defaultConstants = {}

// Setup default sequencer constants here
const c = defaultConstants
c.synthType = 'Synth4Voices'
c.synthInit = {}
c.startWaitTimeS = 0.30
c.endWaitTimeS = 2.00
c.maxSpeakersGain = 0.5
c.startOrEndRampTimeS = 0.10
c.baseFreqHz = 261.63
c.beatLenS = 0.15
c.startOrEndDelayS = 0.01
c.defaultInterpBeats = 0.01
c.minInterpFraction = 0.001
c.defaultInterpType = 5
c.interpArrayLength = 32
c.stopDelay1S = 0.1
c.stopRampDownTimeS = 0.05
c.stopDelay2S = 0.3

export default defaultConstants
