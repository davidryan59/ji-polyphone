import React from 'react'
import Recorder from 'recorder-js'
import { NestedAudioNode } from 'nested-audio-node'
import { SynthControlArray } from 'synth-control'
import { Logger } from 'log-count'

import './App.css'
import defaults from './defaults'
import control from './control'


// ------ LOGGING OPTIONS ------
// 0: nothing
// 1: fatal
// 2: + errors
// 3: + warnings
// 4: + successes and new objects
// 5: + info
// 6: + debug
// 7: + trace
const setLogLevel = 4  // defaults to 4
const useShyLogger = false // if shy, logger doesn't use its name in each line
const hideLogLevel = false
// --------------------------------


// General hard-coded options
const displayDecimalPlaces = 3
const smallTimeShiftS = 1e-8
const comparisonAccuracy = 1e-6


// Numeric display
const dispNum = dps => n => Number.parseFloat(n).toFixed(dps)
const dn = dispNum(displayDecimalPlaces)

// Setup logger and say hi
const logger = new Logger({
  level: setLogLevel,
  shy: useShyLogger,
  hideLevel: hideLogLevel,
})
logger.success('')
logger.success('JI Polyphone app has started')

// Setup audio context. Using both Web Audio API, and Tone.js, so must have same context.
// Set Tone.context before Tone is used for anything else.
const aCtx = new (window.AudioContext || window.webkitAudioContext)()
const Tone = NestedAudioNode.Tone
Tone.context = aCtx

// Defaults object with short name (df)
const df = {}
Object.assign(df, defaults, control.defaults)

// Setup synth (i.e. the whole mixing desk, from sources to destination)
const synth = new NestedAudioNode({
  library: control.nenLibrary,
  type: df.nenName,
  init: df.synthInit,
  logger: logger,
  tag: 'N'
})

// Setup synth control
const sca = new SynthControlArray({
  library: control.scaLibrary,
  type: df.scaName,
  logger: logger,
  tag: 'S'
})
const bpm = df.bpm
const beats = df.totalBeats
sca.setBPM(bpm)
logger.success(`bpm set to ${bpm}`)
sca.scaleToBeats(beats)
logger.success(`SCA has been scaled to ${beats} beats`)
sca.calculateTiming(0)
logger.success('SCA has had timings calculated')
const messageMap = sca.mapParamToMessages()
logger.success('For each SCA param, the array of messages (SCMs) has been found')

// Setup recording - note that Tone.js can connect into Web Audio API, but not vice versa.
const recorder = new Recorder(aCtx)
const recordingDestination = aCtx.createMediaStreamDestination()
recorder.init(recordingDestination.stream)
if (synth.output && synth.output.connect && synth.output.connect.call) {
  synth.output.connect(recordingDestination) // Nested nodes / Tone.js node -> Web Audio API
} else {
  logger.warn('Synth output not found, could not connect to recorder.')
}

// Log some objects
logger.success('')
logger.success('Audio context:')
logger.success({obj:aCtx})
logger.success('Constants and defaults:')
logger.success({obj:df})
logger.success('Control object:')
logger.success({obj:control})
logger.success('Synth (Nested Audio Node)')
logger.success({obj:synth})
logger.success('SCA (Synth Control Array)')
logger.success({obj:sca})
logger.success('Recorder')
logger.success({obj:recorder})
logger.success('Logger frequency counts:')
logger.success({obj: logger.count})
logger.success('')

const sequenceAndStartNotes = () => {
  synth.cancelScheduledValues()
  const timeStartS = Tone.now()
  const timeSeqStartS = timeStartS + df.startWaitTimeS
  logger.success(`Audio context time now: ${dn(timeStartS)}s`)
  logger.success(`Updated SCA start time to ${dn(timeSeqStartS)}s, with beat length ${dn(df.beatLenS)}`)

  // Loop over params
  // Master Gain is controlled below, so ought not to have it in SCA
  const paramArr = Object.keys(messageMap)
  for (let i=0; i<paramArr.length; i += 1) {
    const param = paramArr[i]
    const scmArray = messageMap[param]
    const initialValue = scmArray[0].cch.vs
    let prevValue = initialValue
    synth.updateParam(param, 'setValueAtTime', [initialValue, timeStartS])
    logger.debug(`There ${scmArray.length===1?'is 1 message':`are ${scmArray.length} messages`} to process for ${param} on ${synth}:`)
    logger.info(`Initialised ${param} to ${dn(initialValue)} at ${dn(timeStartS)}s`)
    for (let j = 0; j < scmArray.length; j += 1) {
      const scmThis = scmArray[j];
      const vs = scmThis.cch.vs
      const ve = scmThis.cch.ve
      const ts = scmThis.cch.ts + timeSeqStartS
      const te = scmThis.cch.te + timeSeqStartS
      if (comparisonAccuracy < Math.abs(vs - prevValue)) {
        synth.updateParam(param, 'setValueAtTime', [vs, ts])
        logger.trace({text: `Set ${param} to ${dn(vs)} at ${dn(ts)}s`, type: 'set'})
      }
      if (comparisonAccuracy < Math.abs(ve - vs)) {
        synth.updateParam(param, 'rampTo', [ve, te - ts - 2 * smallTimeShiftS, ts + smallTimeShiftS]) // Small offsets prevent Tone.js glitches
        logger.trace({text: `Ramped ${param} from ${dn(vs)} to ${dn(ve)}, between ${dn(ts)}s and ${dn(te)}s`, type: 'ramp'})
      }
      prevValue = ve;
    }
  }
  const timeSeqEndS = sca.cch.te + timeSeqStartS
  const timeEndS = timeSeqEndS + df.endWaitTimeS
  synth.start(timeStartS)
  synth.updateParam(df.paramSpeakersGain, 'setValueAtTime', [0, timeStartS])
  synth.updateParam(df.paramSpeakersGain, 'rampTo', [df.maxSpeakersGain, df.startOrEndRampTimeS, timeSeqStartS + df.startOrEndDelayS])
  synth.updateParam(df.paramSpeakersGain, 'rampTo', [0, df.startOrEndRampTimeS, timeSeqEndS - df.startOrEndDelayS - df.startOrEndRampTimeS])
  synth.stop(timeEndS)
  const timeAfterCalcsS = Tone.now()

  logger.success('')
  logger.success(`                     START       END`)
  logger.success(`Synth times:         ${dn(timeStartS)}s     ${dn(timeEndS)}s`)
  logger.success(`Sequencing calcs:    ${dn(timeStartS)}s     ${dn(timeAfterCalcsS)}s`)
  logger.success(`SCA times:           ${dn(timeSeqStartS)}s     ${dn(timeSeqEndS)}s`)
  logger.success(`Calc time used:      ${dn(timeAfterCalcsS - timeStartS)}s     ${dn(100 * (timeAfterCalcsS - timeStartS)/(timeSeqStartS - timeStartS))}%`)
  logger.success('')
  logger.success('Logger frequency counts:')
  logger.success({obj: logger.count})
  logger.success('')
}

const stopNotes = () => {
  synth.cancelScheduledValues()
  const timeNowS = Tone.now()
  synth.updateParam(df.paramSpeakersGain, 'rampTo', [0, df.stopRampDownTimeS, timeNowS + df.stopDelay1S])
  synth.stop(timeNowS + df.stopDelay1S + df.stopRampDownTimeS + df.stopDelay2S)
}

const buttons = {}
const buttonLabels = ['togglePlay', 'download'] // These should be buttons in App below
const checkButtons = () => {
  if (Object.keys(buttons).length === 0) {
    buttonLabels.forEach(label => { buttons[label] = document.getElementById(label) })
    logger.success('Got buttons from UI:')
    logger.success({obj:buttons})
  }
}

let isPlaying = false
let blobToDownload = null

const togglePlayButton = () => {
  checkButtons()
  if (isPlaying) {
    logger.success('')
    logger.success('Stopping')
    stopNotes()
    recorder.stop().then(({ blob }) => {
      isPlaying = false
      buttons.togglePlay.value = 'Play'
      blobToDownload = blob
      buttons.download.disabled = false
    })
  } else {
    logger.success('')
    logger.success('Playing')
    sequenceAndStartNotes()
    recorder.start().then(() => {
      isPlaying = true
      buttons.togglePlay.value = 'Stop'
      blobToDownload = null
      buttons.download.disabled = true
    })
  }
}

const downloadButton = () => {
  checkButtons()
  if (blobToDownload) {
    logger.success('')
    logger.success('Downloading')
    Recorder.download(blobToDownload, 'Recording-' + new Date().toISOString()) // downloads a .wav file
  } else {
    logger.warn('Could not find audio blob to download')
    buttons.download.disabled = true
  }
}

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Just Intonation (JI) Polyphony App by David Ryan</p>
        <p>
          <input type='button' id='togglePlay' value='Play' onClick={togglePlayButton} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input type='button' id='download' value='Download' onClick={downloadButton} />
        </p>
      </header>
    </div>
  )
}

export default App
