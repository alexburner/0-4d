import { FC, useEffect, useMemo } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DynamicDrawUsage,
  PointsMaterial,
} from 'three'
import { UseSimulationsStore } from '../stores/simulationStore'

const DOT_SIZE = 1

export const TimeTrails: FC<{
  simulationIndex: number
  useSimulationsStore: UseSimulationsStore
  particleCount: number
  trailLength?: number
  fillStyle?: string
  useSurface?: boolean
}> = ({
  simulationIndex,
  useSimulationsStore,
  particleCount,
  trailLength,
  fillStyle,
  useSurface,
}) => {
  const TRAIL_LENGTH = trailLength ?? 480
  const MAX_POINTS = TRAIL_LENGTH * particleCount
  const ATTR_LENGTH = MAX_POINTS * 3
  const TRAIL_GAP = 1 / 4

  const positions = useMemo(() => new Float32Array(ATTR_LENGTH), [ATTR_LENGTH])
  const positionsAttr = useMemo(() => createAttribute(positions), [positions])
  const geometry = useMemo(() => createGeometry(positionsAttr), [positionsAttr])
  const texture = useMemo(() => createTexture(fillStyle), [fillStyle])
  const material = useMemo(() => createMaterial(texture), [texture])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const simulation = state.simulations?.[simulationIndex]
      const particles = useSurface ? simulation?.surface : simulation?.particles
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
        if (positionValue === undefined) throw new Error('Unreachable')
        positions[i + attrShift] = positionValue
      }

      // Add incoming particles to attrs
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i]
        if (!particle) throw new Error('Unreachable')
        // Add position
        positions[i * 3 + 0] = particle.position[0] ?? 0
        positions[i * 3 + 1] = particle.position[1] ?? 0
        positions[i * 3 + 2] = particle.position[2] ?? 0
      }

      geometry.setDrawRange(0, MAX_POINTS)
      positionsAttr.needsUpdate = true
    })
  }, [
    useSurface,
    simulationIndex,
    useSimulationsStore,
    positionsAttr,
    geometry,
    positions,
    TRAIL_GAP,
    TRAIL_LENGTH,
    ATTR_LENGTH,
    MAX_POINTS,
    particleCount,
  ])

  return <points geometry={geometry} material={material} />
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

const createTexture = (fillStyle = 'rgba(255, 255, 255, 0.85)') => {
  const size = 256
  const padding = 4
  const radius = size / 2 - padding
  const center = size / 2
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Failed to get 2d canvas context')
  context.beginPath()
  context.arc(center, center, radius, 0, 2 * Math.PI)
  context.fillStyle = fillStyle
  context.fill()
  return new CanvasTexture(canvas)
}

const createMaterial = (texture: CanvasTexture) => {
  return new PointsMaterial({
    blending: AdditiveBlending,
    sizeAttenuation: true,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.9,
    map: texture,
    size: DOT_SIZE,
  })
}
