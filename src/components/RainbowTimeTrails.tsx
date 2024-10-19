import { FC, useEffect, useMemo } from 'react'
import { Color } from 'three'
import { getMagnitudeSq } from '../simulation/vectorN'
import { UseSimulationsStore } from '../stores/simulationStore'
import {
  createBufferAttr,
  createGeometry,
  createHueScale,
  createMaterial,
  RAINBOW_L,
  RAINBOW_S,
  ZERO_TOLERANCE,
} from '../util/rainbowHelpers'

const DOT_SIZE = 1
const DOT_OPACITY = 1

const material = createMaterial(DOT_SIZE, DOT_OPACITY)
const color = new Color()

export const RainbowTimeTrails: FC<{
  simulationIndex: number
  simulationRadius: number
  useSimulationsStore: UseSimulationsStore
  particleCount: number
  trailLength?: number
  isInfinity?: boolean
}> = ({
  simulationIndex,
  simulationRadius,
  useSimulationsStore,
  particleCount,
  trailLength,
  isInfinity,
}) => {
  const hueScale = useMemo(
    () => createHueScale(simulationRadius),
    [simulationRadius],
  )
  const TRAIL_LENGTH = trailLength ?? 480
  const MAX_POINTS = TRAIL_LENGTH * particleCount
  const ATTR_LENGTH = MAX_POINTS * 3
  const TRAIL_GAP = 1 / 4

  const positions = useMemo(() => new Float32Array(ATTR_LENGTH), [ATTR_LENGTH])
  const colors = useMemo(() => new Float32Array(ATTR_LENGTH), [ATTR_LENGTH])
  const positionsAttr = useMemo(() => createBufferAttr(positions), [positions])
  const colorsAttr = useMemo(() => createBufferAttr(colors), [colors])
  const geometry = useMemo(
    () => createGeometry({ positionsAttr, colorsAttr }),
    [positionsAttr, colorsAttr],
  )

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const particles = state.simulations?.[simulationIndex]?.particles
      if (!particles) return
      if (particles.length !== particleCount) {
        throw new Error('Unexpected number of incoming particles')
      }

      // Give each existing position a nudge in z-space
      // Note: we only check every third (z) position
      for (let i = 2; i < ATTR_LENGTH; i += 3) {
        const zValue = positions[i]
        if (zValue === undefined) break
        positions[i] = zValue - TRAIL_GAP
      }

      // Shift each existing attribute down the line
      const attrShift = particleCount * 3
      const attrShiftStart = ATTR_LENGTH - 1 - attrShift
      for (let i = attrShiftStart; i >= 0; i--) {
        // Shift position
        const positionValue = positions[i]
        if (positionValue === undefined) throw new Error('For TS')
        positions[i + attrShift] = positionValue
        // Shift color
        const colorValue = colors[i]
        if (colorValue === undefined) throw new Error('For TS')
        colors[i + attrShift] = colorValue
      }

      // Add incoming particles to attrs
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i]
        if (!particle) throw new Error('For TS')
        // Add position
        positions[i * 3 + 0] = particle.position[0] ?? 0
        positions[i * 3 + 1] = particle.position[1] ?? 0
        positions[i * 3 + 2] = particle.position[2] ?? 0
        // Add color
        const radiusSq = getMagnitudeSq(particle.position)
        if (radiusSq < ZERO_TOLERANCE) {
          colors[i * 3 + 0] = 1
          colors[i * 3 + 1] = 1
          colors[i * 3 + 2] = 0
        } else {
          const hue = isInfinity
            ? hueScale(simulationRadius * simulationRadius)
            : hueScale(radiusSq)
          color.setHSL(hue, RAINBOW_S, RAINBOW_L)
          colors[i * 3 + 0] = color.r
          colors[i * 3 + 1] = color.g
          colors[i * 3 + 2] = color.b
        }
      }

      geometry.setDrawRange(0, MAX_POINTS)
      positionsAttr.needsUpdate = true
      colorsAttr.needsUpdate = true
    })
  }, [
    simulationIndex,
    simulationRadius,
    useSimulationsStore,
    positionsAttr,
    geometry,
    positions,
    TRAIL_GAP,
    TRAIL_LENGTH,
    colors,
    colorsAttr,
    hueScale,
    ATTR_LENGTH,
    MAX_POINTS,
    particleCount,
    isInfinity,
  ])

  return <points geometry={geometry} material={material} />
}
