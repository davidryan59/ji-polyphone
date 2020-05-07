import {basicInterpArray, zeroToNArray, interpArrayQuad, interpArrayPow, interpFn} from './interpFns'

test('basicInterpArray() gives [0, 1]', () => {
  const arr1 = basicInterpArray()
  const arr2 = [0, 1]
  expect(arr1).toEqual(arr2)
});

test('zeroToNArray(3) gives [0, 1, 2, 3]', () => {
  const arr1 = zeroToNArray(3)
  const arr2 = [0, 1, 2, 3]
  expect(arr1).toEqual(arr2)
});

test('interpArrayQuad(4) gives [0, 0.25**2, 0.5**2, 0.75**2, 1]', () => {
  const arr1 = interpArrayQuad(4)
  const arr2 = [0, 0.25**2, 0.5**2, 0.75**2, 1]
  expect(arr1).toEqual(arr2)
});

test('interpArrayPow(5)(4) gives [0, 5*0.25**4-4*0.25**5, 5*0.5**4-4*0.5**5, 5*0.75**4-4*0.75**5, 1]', () => {
  const arr1 = interpArrayPow(5)(4)
  const arr2 = [0, 5*0.25**4-4*0.25**5, 5*0.5**4-4*0.5**5, 5*0.75**4-4*0.75**5, 1]
  expect(arr1).toEqual(arr2)
});

test('interpFn(0, 23) gives [0, 1]', () => {
  const arr1 = interpFn(0, 23)
  const arr2 = [0, 1]
  expect(arr1).toEqual(arr2)
});

test('interpFn(1, 71) gives [0, 1]', () => {
  const arr1 = interpFn(1, 71)
  const arr2 = [0, 1]
  expect(arr1).toEqual(arr2)
});

test('interpFn(2, 7) gives same result as interpArrayQuad(7)', () => {
  const arr1 = interpFn(2, 7)
  const arr2 = interpArrayQuad(7)
  expect(arr1).toEqual(arr2)
});

test('interpFn(3, 4) gives [0, 0.15625, 0.5, 0.84375, 1]', () => {
  const arr1 = interpFn(3, 4)
  const arr2 = [0, 0.15625, 0.5, 0.84375, 1]
  expect(arr1).toEqual(arr2)
});

test('interpFn(3, 4) gives same result as interpArrayPow(3)(4)', () => {
  const arr1 = interpFn(3, 4)
  const arr2 = interpArrayPow(3)(4)
  expect(arr1).toEqual(arr2)
});

test('interpFn(4, 4) gives [0, 0.4375, 0.75, 0.9375, 1]', () => {
  const arr1 = interpFn(4, 4)
  const arr2 = [0, 0.4375, 0.75, 0.9375, 1]
  expect(arr1).toEqual(arr2)
});

test('interpFn(4, 4) gives same result as interpArrayPow(2)(4)', () => {
  const arr1 = interpFn(4, 4)
  const arr2 = interpArrayPow(2)(4)
  expect(arr1).toEqual(arr2)
});

test('interpFn(7, 4) gives [0, 7*0.25**6-6*0.25**7, 7*0.5**6-6*0.5**7, 7*0.75**6-6*0.75**7, 1]', () => {
  const arr1 = interpFn(7, 4)
  const arr2 = [0, 7*0.25**6-6*0.25**7, 7*0.5**6-6*0.5**7, 7*0.75**6-6*0.75**7, 1]
  expect(arr1).toEqual(arr2)
});

test('interpFn(7, 4) gives same result as interpArrayPow(7)(4)', () => {
  const arr1 = interpFn(7, 4)
  const arr2 = interpArrayPow(7)(4)
  expect(arr1).toEqual(arr2)
});
