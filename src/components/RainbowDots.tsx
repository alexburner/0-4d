import { FC, useEffect, useMemo } from 'react'
import { Color } from 'three'
import { getMagnitudeSq } from '../simulation/vectorN'
import { UseSimulationsStore } from '../stores/simulationStore'
import {
  createBufferAttr,
  createGeometry,
  createHueScale,
  createMaterial,
} from '../util/rainbowHelpers'

const MAX_POINTS = 1000
const DOT_SIZE = 3
const ATTR_LENGTH = MAX_POINTS * 3

const color = new Color()

export const RainbowDots: FC<{
  simulationIndex: number
  simulationRadius: number
  useSimulationsStore: UseSimulationsStore
}> = ({ simulationIndex, simulationRadius, useSimulationsStore }) => {
  const hueScale = useMemo(
    () => createHueScale(simulationRadius),
    [simulationRadius],
  )
  const positions = useMemo(() => new Float32Array(ATTR_LENGTH), [])
  const colors = useMemo(() => new Float32Array(ATTR_LENGTH), [])
  const positionsAttr = useMemo(() => createBufferAttr(positions), [positions])
  const colorsAttr = useMemo(() => createBufferAttr(colors), [colors])
  const geometry = useMemo(
    () => createGeometry({ positionsAttr, colorsAttr }),
    [positionsAttr, colorsAttr],
  )
  const material = useMemo(() => createMaterial(DOT_SIZE), [])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const particles = state.simulations?.[simulationIndex]?.particles
      if (!particles) return
      particles.forEach((particle, i) => {
        positions[i * 3 + 0] = particle.position[0] ?? 0
        positions[i * 3 + 1] = particle.position[1] ?? 0
        positions[i * 3 + 2] = particle.position[2] ?? 0
        const radiusSq = getMagnitudeSq(particle.position)
        const hue = hueScale(radiusSq)
        color.setHSL(hue, 0.9, 0.2)
        colors[i * 3 + 0] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      })
      geometry.setDrawRange(0, particles.length)
      positionsAttr.needsUpdate = true
      colorsAttr.needsUpdate = true
    })
  }, [
    simulationIndex,
    useSimulationsStore,
    positionsAttr,
    geometry,
    positions,
    colors,
    colorsAttr,
    hueScale,
  ])

  return <points geometry={geometry} material={material} />
}
