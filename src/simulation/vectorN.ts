import { random } from 'lodash'
import { coinFlip, shuffle } from '../util/util'

/**
 * N-dimensional vectors
 * -> length of vector = number of dimensions
 * -> helper functions assume vectors have same dimensions
 */

export type VectorN = number[]

const createVectorN = (dimensions: number): VectorN =>
  new Array<number>(dimensions).fill(0)

type VectorMath = (a: VectorN, b: VectorN | number) => VectorN
type NumberMath = (a: number, b: number) => number
const curryMath =
  (math: NumberMath): VectorMath =>
  (a, b) => {
    // create new result vector
    const c = createVectorN(a.length)
    // b is either VectorN or const n
    const isNumB = typeof b === 'number'
    // calc each n pair math
    for (let i = 0, l = a.length; i < l; i++) {
      const an = a[i] ?? 0
      const bn = isNumB ? b : b[i] ?? 0
      // write result to c
      c[i] = math(an, bn)
    }
    return c
  }

export const add: VectorMath = curryMath((a, b) => a + b)
export const subtract: VectorMath = curryMath((a, b) => a - b)
export const multiply: VectorMath = curryMath((a, b) => a * b)
export const divide: VectorMath = curryMath((a, b) => a / b)

export const dotProduct = (a: VectorN, b: VectorN): number => {
  // "Algebraically, the dot product is the sum of the products
  // of the corresponding entries of the two sequences of numbers"
  // https://en.wikipedia.org/wiki/Dot_product
  let sum = 0
  for (let i = 0, l = a.length; i < l; i++) {
    const an = a[i] ?? 0
    const bn = b[i] ?? 0
    sum += an * bn
  }
  return sum
}

export const getMagnitudeSq = (v: VectorN): number => {
  let magnitudeSq = 0
  for (let i = 0, l = v.length; i < l; i++) {
    const n = v[i] ?? 0 // ?? 0 for TS
    magnitudeSq += n * n
  }
  return magnitudeSq
}

export const getMagnitude = (v: VectorN): number => Math.sqrt(getMagnitudeSq(v))

export const getDistanceSq = (a: VectorN, b: VectorN): number => {
  const delta = subtract(a, b)
  return getMagnitudeSq(delta)
}

export const getDistance = (a: VectorN, b: VectorN): number =>
  Math.sqrt(getDistanceSq(a, b))

export const setMagnitude = (v: VectorN, magnitude: number): VectorN => {
  const prevMagnitude = getMagnitude(v)
  return prevMagnitude === 0
    ? add(v, Math.sqrt(magnitude / v.length))
    : multiply(v, magnitude / prevMagnitude)
}

export const limitMagnitude = (v: VectorN, limit: number): VectorN => {
  const limitSq = limit * limit
  const currSq = getMagnitudeSq(v)
  return currSq > limitSq ? multiply(v, limitSq / currSq) : v
}

export const randomVector = (dimensions: number, k: number) => {
  const vector = createVectorN(dimensions)
  return vector.map(() => random(-k, k))
}

export const radialRandomVector = (dimensions: number, radius = 1): VectorN => {
  // Algorithm via Colin Ballast
  // -> generates a random vector within a radial space
  let remainingRadiusSq = radius * radius
  const result = createVectorN(dimensions).map(() => {
    // Get a random value within the remaining radial space
    const value = Math.random() * Math.sqrt(remainingRadiusSq)
    // Decrement the remaining radial space
    remainingRadiusSq -= value * value
    // Randomly flip new value across +/-
    return coinFlip() ? value : -value
  })
  shuffle(result)
  return result
}
