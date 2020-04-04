import React from 'react';
import * as Tone from 'tone'
import Recorder from 'recorder-js'

import NestedAudioNode from './NestedAudioNode'
import './App.css';

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
const aCtx = new (window.AudioContext || window.webkitAudioContext)();
Tone.context = aCtx

// Setup synth
const synth = new NestedAudioNode({
  library,
  type: c.synthType,
  init: c.synthInit,
  verbose: true
})

// Setup recording - note that Tone.js can connect into Web Audio API, but not vice versa.
const recorder = new Recorder(aCtx);
const recordingDestination = aCtx.createMediaStreamDestination();
recorder.init(recordingDestination.stream)
if (synth.output && synth.output.connect && synth.output.connect.call) {
  synth.output.connect(recordingDestination)   // Nested nodes / Tone.js node -> Web Audio API
} else {
  console.log(`ERROR:  Synth output not found, could not connect to recorder.`)
}

// Setup sequencing
const numSeqs = sequenceData.length
const initFreqs = sequenceData[0][1]
const numChannels = initFreqs[1].length
const channelGain = c.maxGain / numChannels
console.log(`numChannels ${numChannels}`)
console.log(`channelGain ${channelGain}`)

const sequenceAndStartNotes = () => {
  synth.cancelScheduledValues()
  const toneNow = Tone.now()
  const timeStartS = toneNow + c.startDelayS
  let timeThisStartS = timeStartS
  for (let i=0; i<numSeqs; i++) {
    const beatLengths = sequenceData[i][0]
    const timeTotalS = c.beatTimeS * beatLengths[0]
    // if (timeTotalS < c.deltaTime) continue  // Doesn't work - operates on the wrong one - due to rampTo on NEXT....
    let timeSlideS = c.beatTimeS * ((Number.isFinite(beatLengths[1])) ? beatLengths[1] : c.defaultSlideBeats)
    timeSlideS = Math.min(timeSlideS, c.justBelow1 * timeTotalS)
    const timeLevelS = timeTotalS - timeSlideS
    for (let j=0; j<numChannels; j++) {
      const freqParamLabel = `freq${j+1}`
      const freqsThis = sequenceData[i][1]
      const freqsNext = (sequenceData[i+1]) ? sequenceData[i+1][1] : freqsThis
      const freqThisHz = c.baseFreq * freqsThis[0] * freqsThis[1][j]
      const freqNextHz = c.baseFreq * freqsNext[0] * freqsNext[1][j]
      if (i === 0) synth.updateParam(freqParamLabel, 'setValueAtTime', [freqThisHz, toneNow])
      synth.updateParam(freqParamLabel, 'rampTo', [freqNextHz, timeSlideS, timeThisStartS + timeLevelS]) //
    }
    timeThisStartS += timeLevelS + timeSlideS
  }
  const timeEnd = timeThisStartS
  synth.start(toneNow)
  synth.updateParam('masterGain', 'setValueAtTime', [0, toneNow])
  synth.updateParam('masterGain', 'rampTo', [c.maxMasterGain, c.masterGainRampTime, timeStartS + c.smallDelay])
  synth.updateParam('masterGain', 'rampTo', [0, c.masterGainRampTime, timeEnd - c.smallDelay - c.masterGainRampTime])
  synth.stop(timeEnd)
}

const stopNotes = () => {
  synth.cancelScheduledValues()
  synth.stop()
}

const buttons = {}
const buttonLabels = ['togglePlay', 'download']  // These should be buttons in App below
const checkButtons = () => {
  if (Object.keys(buttons).length === 0) {
    console.log('Getting buttons from UI')
    buttonLabels.forEach( label => buttons[label] = document.getElementById(label) )
    console.log(buttons)
  }
}

let isPlaying = false;
let blobToDownload = null;

const togglePlayButton = () => {
  checkButtons()
  if (isPlaying) {
    console.log('Stopping...')
    stopNotes()
    recorder.stop().then( ({blob}) => {
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
    });
  }
}

const downloadButton = () => {
  checkButtons()
  if (blobToDownload) {
    console.log('Downloading...')
    Recorder.download(blobToDownload, 'Recording-' + new Date().toISOString()); // downloads a .wav file
  } else {
    console.log('ERROR: Could not find audio blob to download')
    buttons.download.disabled = true
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Just Intonation (JI) Polyphony App by David Ryan</p>
        <p>
          <input type="button" id="togglePlay" value="Play" onClick={togglePlayButton} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="button" id="download" value="Download" onClick={downloadButton} />
        </p>
      </header>
    </div>
  );
}

export default App;
