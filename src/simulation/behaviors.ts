import { clamp } from 'lodash'
import { Neighborhood } from './neighborhood'
import { Particle } from './particles'
import {
  add,
  divide,
  getMagnitudeSq,
  multiply,
  randomVector,
  setMagnitude,
} from './vectorN'

export type Behavior = OrbitingBehavior | WanderingBehavior | DiffusionBehavior

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

/**
 * Diffusion
 */

interface DiffusionBehavior {
  name: 'diffusion'
  config: { charge: number }
}

export const diffusion = (
  particles: Particle[],
  neighborhood: Neighborhood,
  config: DiffusionBehavior['config'],
) => {
  // Only works if more than 1 particle
  if (particles.length < 1) return

  // Compare every particle to nearest neighbor
  const count = particles.length
  const countSq = count * count
  const chargeSq = config.charge * config.charge
  particles.forEach((particle, i) => {
    const neighbors = neighborhood[i]
    if (!neighbors) return
    const nearestNeighbor = neighbors[0]
    if (!nearestNeighbor) return
    const { delta, distance } = nearestNeighbor
    // Set force magnitude with inverse square law + magic
    const distanceSq = distance > 0 ? distance * distance : 1
    const force = setMagnitude(delta, chargeSq / distanceSq / countSq)
    // Accelerate away from neighbor
    particle.acceleration = add(particle.acceleration, force)
  })
}
