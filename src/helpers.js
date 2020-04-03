import * as Tone from 'tone'

export const doNothing = () => {}

export const isObject = val => {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}

export const isArray = val => Array.isArray(val)

export const isArrayOrObject = val => isArray(val) || isObject(val)

export const disp = val => JSON.stringify(val)

export const arrayIndexPopulated = (array, idx) => isArray(array) && array[idx] != null

export const isAudioParam = item => {
  // Is this item a schedulable audio parameter?
  // Main question is whether it is an a-rate or k-rate param
  return (item instanceof Tone.Param) || (AudioParam && item instanceof AudioParam)
}
