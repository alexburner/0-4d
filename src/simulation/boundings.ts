import { max, minBy } from 'lodash'
import { Neighborhood } from './neighborhood'
import { Particle } from './particles'
import { getMagnitude, getMagnitudeSq, multiply, setMagnitude } from './vectorN'

export type Bounding =
  | 'centerScaling'
  | 'edgeBinding'
  | 'lengthBinding'
  | 'edgeWrapping'
  | 'edgeReflecting'

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

/**
 * Scale shortest neighbor vector to consistent length
 */
export const lengthBinding = (
  particles: Particle[],
  neighborhood: Neighborhood,
  targetLength: number,
): void => {
  if (particles.length < 2) return
  const nearestNeighbor = minBy(neighborhood.flat(), 'delta')
  if (!nearestNeighbor) throw new Error('Unreachable')
  const targetScale = targetLength / nearestNeighbor.distance
  particles.forEach((p) => (p.position = multiply(p.position, targetScale)))
}

/**
 * Wrap particles across radial edges
 */
export const edgeWrapping = (
  particles: Particle[],
  targetRadius: number,
): void => {
  particles.forEach((p) => {
    const radius = getMagnitude(p.position)
    if (radius > targetRadius) {
      p.position = setMagnitude(p.position, targetRadius)
      p.position = p.position.map((v) => -v)
    }
  })
}

/**
 * Reflect particles back from radial edges
 */
export const edgeReflecting = (
  particles: Particle[],
  targetRadius: number,
): void => {
  for (let i = 0, l = particles.length; i < l; i++) {
    const p = particles[i]
    if (!p) throw new Error('For TS')
    const radius = getMagnitude(p.position)
    if (radius > targetRadius) {
      // we've reached the edge, time to bounce
      // formula = https://3dkingdoms.com/weekly/weekly.php?a=2
      // const n = multiply(p.position, -1)
      // const n = p.position
      // const v = p.velocity
      // const r = add(v, multiply(n, -2 * dotProduct(n, v)))
      // const r = setMagnitude(multiply(n, dotProduct(n, v)), getMagnitude(v))
      // p.velocity = r
      p.velocity = multiply(p.velocity, -1)
      // p.position = add(p.position, p.velocity)
      // p.position = setMagnitude(p.position, targetRadius * 0.9)
    }
  }
}
