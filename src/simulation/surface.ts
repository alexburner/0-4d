import { cloneParticle, Particle } from './particles'
import { setMagnitude } from './vectorN'

/**
 * Like edgeBinding, but returns a copy
 */
export const surfaceProjection = (
  particles: Particle[],
  targetRadius: number,
): Particle[] => {
  const surfaceParticles: Particle[] = []
  for (let i = 0, l = particles.length; i < l; i++) {
    const p = particles[i]
    if (!p) throw new Error('For TS')
    const clone = cloneParticle(p)
    clone.position = setMagnitude(clone.position, targetRadius)
    surfaceParticles.push(clone)
  }
  return surfaceParticles
}
