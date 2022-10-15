import { times } from 'lodash'
import { radialRandomVector, VectorN } from './vectorN'

export interface Particle {
  dimensions: number
  position: VectorN
  velocity: VectorN
  acceleration: VectorN
}

export const cloneParticle = ({
  dimensions,
  position,
  velocity,
  acceleration,
}: Particle) => ({
  dimensions,
  position: [...position],
  velocity: [...velocity],
  acceleration: [...acceleration],
})

const makeFreshParticles = (
  dimensions: number,
  radius: number,
  count: number,
): Particle[] => times(count, () => makeFreshParticle(dimensions, radius))

const makeFilledParticles = (
  dimensions: number,
  radius: number,
  oldParticles: Particle[],
): Particle[] =>
  oldParticles.map((oldP) => makeFilledParticle(dimensions, radius, oldP))

export const makeFreshParticle = (
  dimensions: number,
  radius: number,
): Particle => ({
  dimensions,
  position: radialRandomVector(dimensions, radius / 2),
  velocity: radialRandomVector(dimensions, 0.5),
  acceleration: radialRandomVector(dimensions, 0.5),
})

const makeFilledParticle = (
  dimensions: number,
  radius: number,
  oldP: Particle,
): Particle => {
  const newP = makeFreshParticle(dimensions, radius)
  newP.position = assign(newP.position, oldP.position)
  newP.velocity = assign(newP.velocity, oldP.velocity)
  newP.acceleration = assign(newP.acceleration, oldP.acceleration)
  return newP
}

/**
 * Copies `src` values into `dst` values, if they exist
 * (allows copying between vectors of different dimensionality)
 */
const assign = (dst: VectorN, src: VectorN): VectorN =>
  dst.map((dstN, dimension) => {
    const srcN = src[dimension]
    return srcN !== undefined ? srcN : dstN
  })

/**
 * Makes a set of particles & upscales it through dimensions
 */
export const makeParticlesThroughDimensions = (
  dimensionCount: number,
  particleCount: number,
  radius: number,
) => {
  const particlesByDimension: Particle[][] = []
  for (let dimension = 0; dimension < dimensionCount; dimension++) {
    // Prefill next dimension with previous values, if available
    const prevParticles = particlesByDimension[dimension - 1]
    const nextParticles = prevParticles
      ? makeFilledParticles(dimension, radius, prevParticles)
      : makeFreshParticles(dimension, radius, particleCount)
    particlesByDimension.push(nextParticles)
  }
  return particlesByDimension
}
