/* eslint-disable */

const defaultConstants = {}

// Setup default sequencer constants here
const c = defaultConstants
c.synthType = 'Synth4Voices'
c.synthInit = {}
c.maxMasterGain = 0.95
c.baseFreqHz = 261.63
c.beatLenS = 0.15
c.shortDelayS = 0.01
c.masterGainRampTimeS = 0.10
c.initialWaitS = 0.50
c.endWaitS = 2.00
c.defaultInterpBeats = 0.01
c.minInterpFraction = 0.001
c.defaultInterpType = 5
c.interpArrayLength = 32

export default defaultConstants
