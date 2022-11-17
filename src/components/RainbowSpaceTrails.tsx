import { FC, useEffect, useMemo } from 'react'
import { Color } from 'three'
import { cloneParticle, Particle } from '../simulation/particles'
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
import { RecentQueue } from '../util/RecentQueue'

const TRAIL_LENGTH = 200
const MAX_POINTS = TRAIL_LENGTH * 100
const ATTR_LENGTH = MAX_POINTS * 3
const DOT_SIZE = 1
const DOT_OPACITY = 0.3

const color = new Color()

export const RainbowSpaceTrails: FC<{
  simulationIndex: number
  simulationRadius: number
  useSimulationsStore: UseSimulationsStore
  fillStyle?: string
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
  const material = useMemo(() => createMaterial(DOT_SIZE, DOT_OPACITY), [])
  const trailQueues = useMemo<RecentQueue<Particle>[]>(() => [], [])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const particles = state.simulations?.[simulationIndex]?.particles
      if (!particles) return

      // (maybe) Add queues to fit
      while (trailQueues.length < particles.length) {
        trailQueues.push(new RecentQueue(TRAIL_LENGTH))
      }

      // (maybe) Remove queues to fit
      while (trailQueues.length > particles.length) {
        trailQueues.pop()
      }

      // Add new particles to queues
      trailQueues.forEach((trailQueue, i) => {
        const particle = particles[i]
        if (!particle) throw new Error('Unreachable')
        trailQueue.add(cloneParticle(particle))
      })

      // Update rendered positions
      let drawCount = 0
      trailQueues.forEach((trailQueue) => {
        trailQueue.values().forEach((particle) => {
          positions[drawCount * 3 + 0] = particle.position[0] ?? 0
          positions[drawCount * 3 + 1] = particle.position[1] ?? 0
          positions[drawCount * 3 + 2] = particle.position[2] ?? 0
          const radiusSq = getMagnitudeSq(particle.position)
          if (radiusSq < ZERO_TOLERANCE) {
            colors[drawCount * 3 + 0] = 1
            colors[drawCount * 3 + 1] = 1
            colors[drawCount * 3 + 2] = 0
          } else {
            const hue = hueScale(radiusSq)
            color.setHSL(hue, RAINBOW_S, RAINBOW_L)
            colors[drawCount * 3 + 0] = color.r
            colors[drawCount * 3 + 1] = color.g
            colors[drawCount * 3 + 2] = color.b
          }
          drawCount++
        })
      })
      geometry.setDrawRange(0, drawCount)
      positionsAttr.needsUpdate = true
      colorsAttr.needsUpdate = true
    })
  }, [
    simulationIndex,
    useSimulationsStore,
    positionsAttr,
    geometry,
    positions,
    trailQueues,
    colors,
    colorsAttr,
    hueScale,
  ])

  return <points geometry={geometry} material={material} />
}
