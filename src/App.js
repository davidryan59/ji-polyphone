import React from 'react';
import * as Tone from 'tone'
import './App.css';
import { sequenceSetup, polyphonySequence } from './seq/sequence'

// Overall constants
const c = {}
c.maxGain = 0.2
c.startDelayS = 0.5
c.beatTimeS = 0.17
c.defaultSlideBeats = 0.01
c.baseFreq = 1.0249348  // make all frequencies slightly irrational
c.deltaTime = 0.00001
c.deltaGain = 0.000001
c.justBelow1 = 0.999
// Override these with any constants from sequence file itself
Object.assign(c, sequenceSetup)


const numSeqs = polyphonySequence.length
const initFreqs = polyphonySequence[0][1]
const numChannels = initFreqs[1].length
const channelGain = c.maxGain / numChannels
console.log(`numChannels ${numChannels}`)
console.log(`channelGain ${channelGain}`)

// Keep all audio / Tone.js nodes here
const n = {}

// Construct several oscillator channels
n.oscs = new Array(numChannels)
n.gains = new Array(numChannels)
n.oscGainPost = new Tone.Gain()
for (let i=0; i<numChannels; i++) {
  n.oscs[i] = new Tone.Oscillator({type: 'triangle', frequency: 440})
  n.gains[i] = new Tone.Gain({gain: channelGain})
  n.oscs[i].chain(n.gains[i], n.oscGainPost)
}

// Make a function to generate random numbers between X/Y and XY, peaking at X
// where Y = exponent ** ratio
const randomExpTriDist = (peak, exponent, ratio) => () =>
  peak * exponent ** ( ratio * (Math.random() + Math.random() - 1) )

const randomDelayArrayGenerator = (len, peak, exponent, ratio) => () => {
  const arr = new Array(len)
  const genFn = randomExpTriDist(peak, exponent, ratio)
  for (let i=0; i<len; i++) arr[i] = genFn()
  arr.sort()
  return arr
}

const delayComponentGenerator = delayTimesFn => {
  // Construct result in this variable
  const r = {}
  r.delayTimes = delayTimesFn()
  r.numDelays = r.delayTimes.length
  // Setup and connect shared nodes
  r.input = new Tone.Gain(1)
  r.delayGain = new Tone.Gain(-1/r.numDelays)
  r.output = new Tone.Gain(1)
  r.input.connect(r.output) // Main line through
  r.delayGain.connect(r.output) // Delay line
  // Setup and connect array of delays
  r.delays = new Array(r.numDelays)
  for (let i=0; i<r.numDelays; i++) {
    const delayTime = r.delayTimes[i]
    const maxDelayTime = delayTime
    r.delays[i] = new Tone.Delay(delayTime, maxDelayTime)
    r.input.chain(r.delays[i], r.delayGain)
  }
  // Delays in some browsers need (small) constant input otherwise they stop
  // - even when the sound should be still delaying... here is a workaround
  r._osc = new Tone.Oscillator({type: 'square', frequency: 420})
  r._gain = new Tone.Gain(c.deltaGain)
  r._osc.chain(r._gain, r.input)
  r._osc.start()
  // Return finished component
  return r
}

// Construct several delay channels
const delayTimesFn = randomDelayArrayGenerator(2, 0.02, 2, 2)
n.delayComponentL = delayComponentGenerator(delayTimesFn)
n.delayComponentR = delayComponentGenerator(delayTimesFn)
n.panL = new Tone.Panner(-1)
n.panR = new Tone.Panner(1)

// Connect components
n.oscGainPost.connect(n.delayComponentL.input)
n.oscGainPost.connect(n.delayComponentR.input)
n.delayComponentL.output.chain(n.panL, Tone.Master)
n.delayComponentR.output.chain(n.panR, Tone.Master)

const cancelScheduledValues = () => {
  n.oscs.forEach(osc => {
    osc.frequency.cancelScheduledValues()
  })
}

const sequenceAndStartNotes = () => {
  cancelScheduledValues()
  const timeStartS = Tone.now() + c.startDelayS
  let timeThisStartS = timeStartS
  for (let i=0; i<numSeqs; i++) {
    const beatLengths = polyphonySequence[i][0]
    const timeTotalS = c.beatTimeS * beatLengths[0]
    // if (timeTotalS < c.deltaTime) continue  // Doesn't work - operates on the wrong one - due to rampTo on NEXT....
    let timeSlideS = c.beatTimeS * ((Number.isFinite(beatLengths[1])) ? beatLengths[1] : c.defaultSlideBeats)
    timeSlideS = Math.min(timeSlideS, c.justBelow1 * timeTotalS)
    const timeLevelS = timeTotalS - timeSlideS
    for (let j=0; j<numChannels; j++) {
      const freqParam = n.oscs[j].frequency
      const freqsThis = polyphonySequence[i][1]
      const freqsNext = (polyphonySequence[i+1]) ? polyphonySequence[i+1][1] : freqsThis
      const freqThisHz = c.baseFreq * freqsThis[0] * freqsThis[1][j]
      const freqNextHz = c.baseFreq * freqsNext[0] * freqsNext[1][j]
      if (i === 0) freqParam.setValueAtTime(freqThisHz, timeThisStartS)
      freqParam.rampTo(freqNextHz, timeSlideS, timeThisStartS + timeLevelS)
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
