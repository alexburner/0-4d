import { FC, useEffect, useMemo } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  LineBasicMaterial,
} from 'three'
import { UseSimulationsStore } from '../stores/simulationStore'

const MAX_POINTS = 24
const MAX_LINES = MAX_POINTS * MAX_POINTS
const POSITION_COUNT = MAX_LINES * 2 * 3

export const SpaceLines: FC<{
  simulationIndex: number
  useSimulationsStore: UseSimulationsStore
}> = ({ simulationIndex, useSimulationsStore }) => {
  const positions = useMemo(() => new Float32Array(POSITION_COUNT), [])
  const attribute = useMemo(() => createAttribute(positions), [positions])
  const geometry = useMemo(() => createGeometry(attribute), [attribute])
  const material = useMemo(() => createMaterial(), [])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const simulation = state.simulations?.[simulationIndex]
      if (!simulation) return
      const { particles, neighborhood } = simulation
      let posIndex = 0
      let lineCount = 0
      particles.forEach((particle, i) => {
        neighborhood[i]?.forEach((neighbor) => {
          const other = particles[neighbor.index]
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
      geometry.setDrawRange(0, lineCount * 2)
      attribute.needsUpdate = true
    })
  }, [simulationIndex, useSimulationsStore, attribute, geometry, positions])

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
