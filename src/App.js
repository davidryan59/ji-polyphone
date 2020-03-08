import React from 'react';
import * as Tone from 'tone'
import logo from './logo.svg';
import './App.css';

// Overall constants
const maxGain = 0.5
const startDelayS = 0.5
const beatTimeS = 0.2
const defaultSlideBeats = 0.03
const smallS = 0.001

// Sequenced chords
// [[timing], [frequencies]]
// [[timeTotalS, timeSlideS], [baseFreqHz, [relFreq1, relFreq2, relFreq3...]]]
const polyphonySequence = [
  [[4   ], [100,     [2,  3,  4,  5,  6]]],
  [[4   ], [100,     [3,  4,  5,  6,  8]]],
  [[2   ], [150,     [2,  3,  4,  5,  7]]],
  [[2   ], [150,     [3,  4,  5,  6,  8]]],
  [[4, 2], [100*4/3, [2,  3,  4,  7, 10]]],
  [[4   ], [100,     [2,  4,  5,  6, 16]]],
]
const numSeqs = polyphonySequence.length
const numChannels = polyphonySequence[0][1][1].length

const n = {}  // All Nodes
n.oscs = new Array(numChannels)
n.gains = new Array(numChannels)
for (let i=0; i<numChannels; i++) {
  n.oscs[i] = new Tone.Oscillator({type: 'triangle', frequency: 440})
  n.gains[i] = new Tone.Gain({gain: maxGain / numChannels})
  n.oscs[i].connect(n.gains[i])
  n.gains[i].toMaster()
}

const cancelScheduledValues = () => {
  n.oscs.forEach(osc => {
    osc.frequency.cancelScheduledValues()
  })
}

const sequenceAndStartNotes = () => {
  cancelScheduledValues()
  const timeStartS = Tone.now() + startDelayS
  let timeThisStartS = timeStartS
  for (let i=0; i<numSeqs; i++) {
    const beatLengths = polyphonySequence[i][0]
    const timeTotalS = beatTimeS * beatLengths[0]
    const timeSlideS = beatTimeS * ((Number.isFinite(beatLengths[1])) ? beatLengths[1] : defaultSlideBeats)
    const timeLevelS = timeTotalS - timeSlideS
    for (let j=0; j<numChannels; j++) {
      const freqParam = n.oscs[j].frequency
      const freqsThis = polyphonySequence[i][1]
      const freqsNext = (polyphonySequence[i+1]) ? polyphonySequence[i+1][1] : freqsThis
      const freqThisHz = freqsThis[0] * freqsThis[1][j]
      const freqNextHz = freqsNext[0] * freqsNext[1][j]
      freqParam.setValueAtTime(freqThisHz, timeThisStartS)
      freqParam.linearRampTo(freqNextHz, timeSlideS, timeThisStartS + timeLevelS - smallS)
    }
    timeThisStartS += timeLevelS + timeSlideS
  }
  n.oscs.forEach( osc => {
    osc.start(timeStartS)
    osc.stop(timeThisStartS)
  })
}

const stopNotes = () => {
  cancelScheduledValues()
  n.oscs.forEach(osc => {
    osc.stop()
  })
}

const doStart = e => {
  console.log(`Starting...`)
  sequenceAndStartNotes()
}

const doStop = e => {
  console.log(`Stopping...`)
  stopNotes()
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Just Intonation (JI) Polyphony App by David Ryan</p>
        <p>
          <input type="button" value="Play" onClick={doStart} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="button" value="Stop" onClick={doStop} />
        </p>
      </header>
    </div>
  );
}

export default App;
