import { hopeNever } from '../util/ts'
import { Behavior, diffusion, orbiting, rays, wandering } from './behaviors'
import {
  Bounding,
  centerScaling,
  edgeBinding,
  edgeReflecting,
  edgeWrapping,
  lengthBinding,
} from './boundings'
import { getNeighborhood, Neighborhood } from './neighborhood'
import { Particle } from './particles'
import { add, limitMagnitude, multiply } from './vectorN'

interface SimulationConfig {
  behavior: Behavior
  bounding: Bounding
  radius: number
  maxSpeed: number
  calcSurface?: boolean
}

export interface SimulationData {
  particles: Particle[]
  neighborhood: Neighborhood
}

export class Simulation {
  private config?: SimulationConfig
  private particles: Particle[] = []
  private neighborhood: Neighborhood = []

  // New optional surface calc
  // - projected copy of current simulation
  // - no impact on sim state
  // - (unlike boundings)
  private surfaceParticles?: Particle[]

  // Note: why init instead of constructor?
  // Because Comlink expose() doesn't allow passing args
  init(particles: Particle[], config: SimulationConfig) {
    this.config = config
    this.particles = particles
    this.neighborhood = getNeighborhood(particles)

    // presence indicates preference
    if (config.calcSurface) this.surfaceParticles = []
  }

  tick(count = 1): SimulationData {
    if (!this.config) throw new Error('Simulation tick before init')

    for (let i = 0; i < count; i++) {
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
        case 'rays':
          rays(this.particles, this.config.behavior.config)
          break
        case 'diffusion':
          diffusion(
            this.particles,
            this.neighborhood,
            this.config.behavior.config,
            this.config.radius,
            true,
          )
          break
        default:
          hopeNever(this.config.behavior)
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
        case 'lengthBinding':
          lengthBinding(
            this.particles,
            this.neighborhood,
            this.config.radius / 6,
          )
          break
        case 'edgeWrapping':
          edgeWrapping(this.particles, this.config.radius)
          break
        case 'edgeReflecting':
          edgeReflecting(this.particles, this.config.radius)
          break
        default:
          hopeNever(this.config.bounding)
      }

      // Re-calculate particle relations
      this.neighborhood = getNeighborhood(this.particles)

      // Project simulation surface
      if (this.surfaceParticles) {
        // this.surfaceParticles = getSurface(this.particles)
      }
    }

    // Return new data
    return {
      particles: this.particles,
      neighborhood: this.neighborhood,
    }
  }
}
