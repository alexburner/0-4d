import { Behavior, orbiting, wandering } from './Behavior'
import { Bounding, centerScaling, edgeBinding } from './Bounding'
import { getNeighborhood, Neighborhood } from './Neighborhood'
import { Particle } from './Particle'
import { add, limitMagnitude, multiply } from './VectorN'

interface SimulationConfig {
  behavior: Behavior
  bounding: Bounding
  maxForce: number
  maxSpeed: number
  radius: number
}

export interface SimulationData {
  particles: Particle[]
  neighborhood: Neighborhood
}

const DEFAULT_CONFIG: SimulationConfig = {
  behavior: {
    name: 'orbiting',
    config: {
      mass: {
        g: 1,
        orbiter: 10,
        attractor: 30,
      },
      distance: {
        min: 50,
        max: 250,
      },
    },
  },
  bounding: 'centerScaling',
  maxForce: 1,
  maxSpeed: 1,
  radius: 1,
}

export class Simulation {
  private particles: Particle[] = []
  private neighborhood: Neighborhood = []
  private config: SimulationConfig = DEFAULT_CONFIG

  init(particles: Particle[], config: Partial<SimulationConfig> = {}) {
    this.particles = particles
    this.neighborhood = getNeighborhood(particles)
    this.config = { ...this.config, ...config }
  }

  tick(): SimulationData {
    // Reset accelerations
    this.particles.forEach(
      (p) => (p.acceleration = multiply(p.acceleration, 0)),
    )

    // Apply particle behavior
    switch (this.config.behavior.name) {
      case 'orbiting':
        orbiting(this.particles, this.config.behavior.config)
        break
      case 'wandering':
        wandering(this.particles, this.config.behavior.config)
        break
    }

    // Update positions
    this.particles.forEach((p) => {
      p.velocity = add(p.velocity, p.acceleration)
      p.velocity = limitMagnitude(p.velocity, this.config.maxSpeed)
      p.position = add(p.position, p.velocity)
    })

    // Apply particle bounding
    switch (this.config.bounding) {
      case 'centerScaling':
        centerScaling(this.particles, this.config.radius)
        break
      case 'edgeBinding':
        edgeBinding(this.particles, this.config.radius)
        break
    }

    // Re-calculate particle relations
    this.neighborhood = getNeighborhood(this.particles)

    // Return new data
    return {
      particles: this.particles,
      neighborhood: this.neighborhood,
    }
  }
}
