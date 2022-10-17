import { FC, useEffect, useMemo } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  LineBasicMaterial,
} from 'three'
import { SimulationData } from '../simulation/Simulation'
import { UseSimulationsStore } from '../stores/simulationStore'
import { RecentQueue } from '../util/RecentQueue'

const MAX_POINTS = 24
const MAX_LINES = MAX_POINTS * MAX_POINTS
const STACK_GAP = 10
const STACK_COUNT = 22
const POSITION_COUNT = MAX_LINES * 2 * STACK_COUNT * 3

export const TimeLines: FC<{
  simulationIndex: number
  useSimulationsStore: UseSimulationsStore
}> = ({ simulationIndex, useSimulationsStore }) => {
  const positions = useMemo(() => new Float32Array(POSITION_COUNT), [])
  const attribute = useMemo(() => createAttribute(positions), [positions])
  const geometry = useMemo(() => createGeometry(attribute), [attribute])
  const material = useMemo(() => createMaterial(), [])
  const simulationQueue = useMemo<RecentQueue<SimulationData>>(
    () => new RecentQueue(STACK_COUNT),
    [],
  )

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const nextSimulation = state.simulations?.[simulationIndex]
      if (!nextSimulation) return

      // Nudge existing simulation positions
      simulationQueue.values().forEach((simulation) => {
        simulation.particles.forEach((particle) => {
          const z = particle.position[2] ?? 0
          particle.position[2] = z - STACK_GAP
        })
      })

      // Add latest simulation result to queue
      simulationQueue.add(nextSimulation)

      // Write new line segment positions
      let posIndex = 0
      let lineCount = 0
      simulationQueue.values().forEach((simulation) => {
        simulation.particles.forEach((particle, i) => {
          simulation.neighborhood[i]?.forEach((neighbor) => {
            const other = simulation.particles[neighbor.index]
            if (!other) return
            positions[posIndex++] = particle.position[0] ?? 0
            positions[posIndex++] = particle.position[1] ?? 0
            positions[posIndex++] = particle.position[2] ?? 0
            positions[posIndex++] = other.position[0] ?? 0
            positions[posIndex++] = other.position[1] ?? 0
            positions[posIndex++] = other.position[2] ?? 0
            lineCount++
          })
        })
      })
      geometry.setDrawRange(0, lineCount * 2)
      attribute.needsUpdate = true
    })
  }, [
    simulationIndex,
    useSimulationsStore,
    attribute,
    geometry,
    positions,
    simulationQueue,
  ])

  // TODO useFrame animation prev/next simulation damp
  // https://github.com/pmndrs/maath#easing

  return <lineSegments geometry={geometry} material={material} />
}

const createAttribute = (positions: Float32Array) => {
  const attribute = new BufferAttribute(positions, 3)
  attribute.setUsage(DynamicDrawUsage)
  return attribute
}

const createGeometry = (attribute: BufferAttribute) => {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', attribute)
  geometry.setDrawRange(0, 0)
  return geometry
}

const createMaterial = () => {
  return new LineBasicMaterial({
    blending: AdditiveBlending,
    color: 0xffffff,
    depthTest: false,
    opacity: 0.6,
    transparent: true,
  })
}
