import { clamp } from 'lodash'
import { Particle } from './Particle'
import {
  add,
  divide,
  getMagnitudeSq,
  multiply,
  randomVector,
  setMagnitude,
} from './VectorN'

export type Behavior = OrbitingBehavior | WanderingBehavior

/**
 * Orbiting
 */

interface OrbitingBehavior {
  name: 'orbiting'
  config: {
    mass: {
      g: number
      orbiter: number
      attractor: number
    }
    distance: {
      min: number
      max: number
    }
  }
}

export const orbiting = (
  particles: Particle[],
  config: OrbitingBehavior['config'],
) => {
  const minDistSq = config.distance.min * config.distance.min
  const maxDistSq = config.distance.max * config.distance.max
  const mass = config.mass
  particles.forEach((particle) => {
    // Attract each particle to the center
    let force = multiply(particle.position, -1) // vector to center
    const distanceSq = clamp(getMagnitudeSq(force), minDistSq, maxDistSq)
    const strength = (mass.g * mass.attractor * mass.orbiter) / distanceSq
    force = setMagnitude(force, strength)
    force = divide(force, config.mass.orbiter)
    particle.acceleration = add(particle.acceleration, force)
  })
}

/**
 * Wandering
 */

interface WanderingBehavior {
  name: 'wandering'
  config: { jitter: number }
}

export const wandering = (
  particles: Particle[],
  config: WanderingBehavior['config'],
) => {
  particles.forEach((particle) => {
    // Generate random acceleration & add to particle
    const acceleration = randomVector(particle.dimensions, config.jitter)
    particle.acceleration = add(particle.acceleration, acceleration)
  })
}
