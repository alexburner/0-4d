import { random, times } from 'lodash'
import {
  assign,
  createVectorN,
  getMagnitudeSq,
  matchMagnitude,
  radialRandomVector,
  setMagnitude,
  VectorN,
} from './vectorN'

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
  simulationRadius: number,
): Particle => {
  const particle = {
    dimensions,
    position: radialRandomVector(dimensions, simulationRadius * 0.8),
    velocity: radialRandomVector(dimensions, 0.6),
    acceleration: createVectorN(dimensions, 0), // no init accel
  }
  // speed floor
  const speedFloor = 0.3
  const speedSq = getMagnitudeSq(particle.velocity)
  if (speedSq < speedFloor * speedFloor) {
    const speed = Math.sqrt(speedSq)
    const newSpeed = random(speed, speed + speedFloor)
    particle.velocity = setMagnitude(particle.velocity, newSpeed)
  }
  // radius floor
  const radiusFloor = 0.1
  const radiusSq = getMagnitudeSq(particle.position)
  if (radiusSq < radiusFloor * radiusFloor) {
    const radius = Math.sqrt(radiusSq)
    const newRadius = random(radius, radius + radiusFloor)
    particle.position = setMagnitude(particle.position, newRadius)
  }
  return particle
}

const makeFilledParticle = (
  dimensions: number,
  radius: number,
  oldP: Particle,
): Particle => {
  // make a new random particle
  const newP = makeFreshParticle(dimensions, radius)
  if (oldP.dimensions > 0) {
    // overwrite any corresponding new vector values with old
    newP.position = assign(newP.position, oldP.position)
    newP.velocity = assign(newP.velocity, oldP.velocity)
    // restore original magnitudes
    newP.position = matchMagnitude(newP.position, oldP.position)
    newP.velocity = matchMagnitude(newP.velocity, oldP.velocity)
  }
  // all done
  return newP
}

/**
 * Makes a set of particles & upscales it through dimensions
 * DEPRECATED: simple dimensionCount
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

/**
 * Makes a set of particles & upscales it through dimensions
 * NEW: bespoke dimensions list
 */
export const makeParticlesThroughDimensions2 = (
  dimensions: number[], // assumes 0+
  particleCount: number,
  radius: number,
) => {
  const particlesByDimension: Partial<Record<number, Particle[]>> = {}
  dimensions.map((dimension) => {
    // Prefill next dimension with previous values, if available
    const prevParticles = particlesByDimension[dimension - 1]
    const nextParticles = prevParticles
      ? makeFilledParticles(dimension, radius, prevParticles)
      : makeFreshParticles(dimension, radius, particleCount)
    particlesByDimension[dimension] = nextParticles
  })
  return particlesByDimension
}
