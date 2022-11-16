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
} from '../util/rainbowHelpers'
import { RecentQueue } from '../util/RecentQueue'

const DOT_SIZE = 1

const color = new Color()

export const RainbowTimeTrails: FC<{
  simulationIndex: number
  simulationRadius: number
  useSimulationsStore: UseSimulationsStore
  trailLength?: number
}> = ({
  simulationIndex,
  simulationRadius,
  useSimulationsStore,
  trailLength,
}) => {
  const hueScale = useMemo(
    () => createHueScale(simulationRadius),
    [simulationRadius],
  )
  const TRAIL_LENGTH = trailLength ?? 480
  const MAX_POINTS = TRAIL_LENGTH * 100
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
  const material = useMemo(() => createMaterial(DOT_SIZE), [])
  const trailQueues = useMemo<RecentQueue<Particle>[]>(() => [], [])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const particles = state.simulations?.[simulationIndex]?.particles
      if (!particles) return

      const dimensions = particles[0]?.dimensions ?? 0

      // Give each existing particle a nudge in z space
      trailQueues.forEach((trailQueue) => {
        trailQueue.values().forEach((particle) => {
          const z = particle.position[2] ?? 0
          particle.position[2] = z - TRAIL_GAP
        })
      })

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

      /**
       * Todo
       *
       * Decrease memory footprint
       * Don't use queues
       * just the positions array itself
       * each update:
       * (within trail length bounds)
       * - increase z of each position 3el
       * - copy positions values L downwind
       * (L = length of incoming update values)
       * - add update values to front of positions
       * (overwrite any existing values in length range)
       */

      // Update rendered particles
      let drawCount = 0
      trailQueues.forEach((trailQueue) => {
        trailQueue.values().forEach((particle, i) => {
          positions[drawCount * 3 + 0] = particle.position[0] ?? 0
          positions[drawCount * 3 + 1] = particle.position[1] ?? 0
          positions[drawCount * 3 + 2] = particle.position[2] ?? 0
          let originalPosition = [...particle.position]
          if (originalPosition[2]) {
            originalPosition[2] += TRAIL_GAP * i
          }
          if (dimensions < 3) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            originalPosition = originalPosition.map((x) => x ?? 0)
          }
          const radiusSq = getMagnitudeSq(originalPosition)
          const hue = hueScale(radiusSq)
          color.setHSL(hue, 0.75, 0.15)
          colors[drawCount * 3 + 0] = color.r
          colors[drawCount * 3 + 1] = color.g
          colors[drawCount * 3 + 2] = color.b
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
    TRAIL_GAP,
    TRAIL_LENGTH,
    colors,
    colorsAttr,
    hueScale,
  ])

  return <points geometry={geometry} material={material} />
}
