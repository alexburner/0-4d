import { Behavior, orbiting, wandering } from './Behavior'
import { Bounding, centerScaling, edgeBinding } from './Bounding'
import { getNeighborhood, Neighborhood } from './Neighborhood'
import { Particle } from './Particle'
import { add, limitMagnitude, multiply } from './VectorN'

interface SimulationConfig {
  behavior: Behavior
  bounding: Bounding
  radius: number
}

export interface SimulationData {
  particles: Particle[]
  neighborhood: Neighborhood
}

export class Simulation {
  private config?: SimulationConfig
  private particles: Particle[] = []
  private neighborhood: Neighborhood = []
  private readonly maxSpeed = 1

  init(particles: Particle[], config: SimulationConfig) {
    this.config = config
    this.particles = particles
    this.neighborhood = getNeighborhood(particles)
  }

  tick(): SimulationData {
    if (!this.config) throw new Error('Simulation tick before init')

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
      p.velocity = limitMagnitude(p.velocity, this.maxSpeed)
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
