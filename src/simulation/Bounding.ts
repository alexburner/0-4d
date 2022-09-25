import { max } from 'lodash'
import { Particle } from './Particle'
import { getMagnitudeSq, multiply, setMagnitude } from './VectorN'

export type Bounding = 'centerScaling' | 'edgeBinding'

/**
 * Scale all particle positions to be within radius of center
 */
export const centerScaling = (particles: Particle[], targetRadius: number) => {
  if (particles.length < 1) return

  // Avoid Math.sqrt
  const targetRadiusSq = targetRadius * targetRadius

  // Find longest distance between individual particle & origin
  const radiusSqs = particles.map((p) => getMagnitudeSq(p.position))
  const largestRadiusSq = max(radiusSqs)
  if (!largestRadiusSq) return

  // Stop now, if already within limits
  if (largestRadiusSq <= targetRadiusSq) return

  // Scale down all particle positions to fit
  const factor = targetRadiusSq / largestRadiusSq
  particles.forEach((p) => (p.position = multiply(p.position, factor)))
}

/**
 * Scale all particles to be exact radius from center
 */
export const edgeBinding = (
  particles: Particle[],
  targetRadius: number,
): void => {
  particles.forEach(
    (p) => (p.position = setMagnitude(p.position, targetRadius)),
  )
}
