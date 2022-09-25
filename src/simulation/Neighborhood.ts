import { Particle } from './Particle'
import { getMagnitude, subtract, VectorN } from './VectorN'

/**
 * A relation from one Particle to another
 */
interface Neighbor {
  index: number
  distance: number
  delta: VectorN
}

/**
 * List of particle neighbor lists
 */
export type Neighborhood = Neighbor[][]

/**
 * Calculate the neighbor list for each particle
 */
export const getNeighborhood = (particles: Particle[]): Neighborhood =>
  particles.map((particle) => {
    // Find relation with every other particle
    const neighbors: Neighbor[] = []
    particles.forEach((neighbor, index) => {
      if (particle === neighbor) return
      const delta = subtract(particle.position, neighbor.position)
      const distance = getMagnitude(delta)
      neighbors.push({ index, delta, distance })
    })

    // Sort by nearest -> furthest
    neighbors.sort((a, b) => a.distance - b.distance)

    return neighbors
  })
