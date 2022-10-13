import { Behavior, orbiting, wandering } from './behaviors'
import { Bounding, centerScaling, edgeBinding, edgeWrapping } from './boundings'
import { getNeighborhood, Neighborhood } from './neighborhood'
import { Particle } from './particles'
import { add, limitMagnitude, multiply } from './vectorN'

interface SimulationConfig {
  behavior: Behavior
  bounding: Bounding
  radius: number
  maxSpeed: 1
}

export interface SimulationData {
  particles: Particle[]
  neighborhood: Neighborhood
}

export class Simulation {
  private config?: SimulationConfig
  private particles: Particle[] = []
  private neighborhood: Neighborhood = []

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
      p.velocity = limitMagnitude(p.velocity, this.config?.maxSpeed ?? 1)
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
      case 'edgeWrapping':
        edgeWrapping(this.particles, this.config.radius)
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
