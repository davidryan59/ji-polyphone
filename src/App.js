import React from 'react'
import * as Tone from 'tone'
import Recorder from 'recorder-js'

import NestedAudioNode from './NestedAudioNode'
import './App.css'
import { interpArray } from './helpers'

import library from './library'
import sequence from './sequence'
import defaultConstants from './sequence/defaultConstants'

const sequenceConstants = sequence.constants
const sequenceData = sequence.data

console.log('------------- LIBRARY -------------')
console.log(library)

// Make sequence constants easily accessible on a short object name
const c = {}
Object.assign(c, defaultConstants, sequenceConstants)
console.log('------------- CONSTANTS -------------')
console.log(c)

console.log('------------- SEQUENCE DATA -------------')
console.log(sequenceData)

// Setup audio context. Using both Web Audio API, and Tone.js, so must have same context.
// Set Tone.context before Tone is used for anything else.
const aCtx = new (window.AudioContext || window.webkitAudioContext)()
Tone.context = aCtx

// Setup synth
const synth = new NestedAudioNode({
  library,
  type: c.synthType,
  init: c.synthInit,
  verbose: true
})

// Setup recording - note that Tone.js can connect into Web Audio API, but not vice versa.
const recorder = new Recorder(aCtx)
const recordingDestination = aCtx.createMediaStreamDestination()
recorder.init(recordingDestination.stream)
if (synth.output && synth.output.connect && synth.output.connect.call) {
  synth.output.connect(recordingDestination) // Nested nodes / Tone.js node -> Web Audio API
} else {
  console.log('ERROR:  Synth output not found, could not connect to recorder.')
}

// Setup sequencing
const numSeqs = sequenceData.length
const initFreqs = sequenceData[0][1]
const numChannels = initFreqs[1].length
console.log(`numChannels ${numChannels}`)

const sequenceAndStartNotes = () => {
  synth.cancelScheduledValues()
  const toneNow = Tone.now()
  const timeStartS = toneNow + c.initialWaitS
  let timeThisStartS = timeStartS
  for (let i = 0; i < numSeqs; i++) {
    const timingData = sequenceData[i][0]
    const timeTotalS = c.beatLenS * timingData[0]
    let timeInterpS = c.beatLenS * ((Number.isFinite(timingData[1])) ? timingData[1] : c.defaultSlideBeats)
    timeInterpS = Math.max(timeTotalS*c.minInterpFraction, Math.min(timeTotalS * (1-c.minInterpFraction), timeInterpS))
    const interpType = Number.isFinite(timingData[2]) ? timingData[2] : c.defaultInterpType
    const timeLevelS = timeTotalS - timeInterpS
    for (let j = 0; j < numChannels; j++) {
      const freqParamLabel = `freq${j + 1}`
      const freqDataThis = sequenceData[i][1]
      const freqDataNext = (sequenceData[i + 1]) ? sequenceData[i + 1][1] : freqDataThis
      const freqThisHz = c.baseFreqHz * freqDataThis[0] * freqDataThis[1][j]
      const freqNextHz = c.baseFreqHz * freqDataNext[0] * freqDataNext[1][j]
      if (i === 0) synth.updateParam(freqParamLabel, 'setValueAtTime', [freqThisHz, toneNow])
      synth.updateParam(freqParamLabel, 'setValueCurveAtTime',
        [interpArray(interpType, freqThisHz, freqNextHz, c.interpArrayLength), timeThisStartS + timeLevelS, timeInterpS]
      )
    }
    timeThisStartS += timeLevelS + timeInterpS
  }
  const timeEnd = timeThisStartS
  synth.start(toneNow)
  synth.updateParam('masterGain', 'setValueAtTime', [0, toneNow])
  synth.updateParam('masterGain', 'setValueCurveAtTime',
    [interpArray(3, 0, c.maxMasterGain, 24), timeStartS + c.shortDelayS, c.masterGainRampTime]
  )
  synth.updateParam('masterGain', 'setValueCurveAtTime',
    [interpArray(3, c.maxMasterGain, 0, 24), timeEnd - c.shortDelayS - c.masterGainRampTime, c.masterGainRampTime]
  )
  synth.stop(timeEnd)
}

const stopNotes = () => {
  synth.cancelScheduledValues()
  synth.stop()
}

const buttons = {}
const buttonLabels = ['togglePlay', 'download'] // These should be buttons in App below
const checkButtons = () => {
  if (Object.keys(buttons).length === 0) {
    console.log('Getting buttons from UI')
    buttonLabels.forEach(label => { buttons[label] = document.getElementById(label) })
    console.log(buttons)
  }
}

let isPlaying = false
let blobToDownload = null

const togglePlayButton = () => {
  checkButtons()
  if (isPlaying) {
    console.log('Stopping...')
    stopNotes()
    recorder.stop().then(({ blob }) => {
      isPlaying = false
      buttons.togglePlay.value = 'Play'
      blobToDownload = blob
      buttons.download.disabled = false
    })
  } else {
    console.log('Playing...')
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
    console.log('Downloading...')
    Recorder.download(blobToDownload, 'Recording-' + new Date().toISOString()) // downloads a .wav file
  } else {
    console.log('ERROR: Could not find audio blob to download')
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
