import { Particle } from './particles'
import { setMagnitude } from './vectorN'

/**
 * Like edgeBinding, but returns a copy
 */
export const surfaceProjection = (
  surface: Particle[],
  particles: Particle[],
  targetRadius: number,
): void => {
  for (let i = 0, l = particles.length; i < l; i++) {
    const s = surface[i]
    const p = particles[i]
    if (!s || !p) throw new Error('For TS')
    s.position = setMagnitude(p.position, targetRadius)
    surface
  }
}
