/**
 * Uses mutations and for loops to avoid gc
 */

export type VectorN = number[]

type VectorMath = (a: VectorN, b: VectorN | number) => void

export const add: VectorMath = (a, b) => {
  const isNumB = typeof b === 'number'
  for (let i = 0, l = a.length; i < l; i++) {
    const an = a[i]
    const bn = isNumB ? b : b[i]
    if (an === undefined) throw new Error('Unreachable')
    if (bn === undefined) throw new Error('Unreachable')
    a[i] = an + bn
  }
}

export const subtract: VectorMath = (a, b) => {
  const isNumB = typeof b === 'number'
  for (let i = 0, l = a.length; i < l; i++) {
    const an = a[i]
    const bn = isNumB ? b : b[i]
    if (an === undefined) throw new Error('Unreachable')
    if (bn === undefined) throw new Error('Unreachable')
    a[i] = an - bn
  }
}

export const multiply: VectorMath = (a, b) => {
  const isNumB = typeof b === 'number'
  for (let i = 0, l = a.length; i < l; i++) {
    const an = a[i]
    const bn = isNumB ? b : b[i]
    if (an === undefined) throw new Error('Unreachable')
    if (bn === undefined) throw new Error('Unreachable')
    a[i] = an * bn
  }
}

export const divide: VectorMath = (a, b) => {
  const isNumB = typeof b === 'number'
  for (let i = 0, l = a.length; i < l; i++) {
    const an = a[i]
    const bn = isNumB ? b : b[i]
    if (an === undefined) throw new Error('Unreachable')
    if (bn === undefined) throw new Error('Unreachable')
    a[i] = an / bn
  }
}

export const getDistanceSq = (a: VectorN, b: VectorN) => {
  const delta = a.slice()
  subtract(delta, b)
  return getMagnitudeSq(delta)
}

export const getDistance = (a: VectorN, b: VectorN): number =>
  Math.sqrt(getDistanceSq(a, b))

export const getMagnitudeSq = (v: VectorN): number => {
  let magnitudeSq = 0
  for (const n of v) magnitudeSq += n * n
  return magnitudeSq
}
