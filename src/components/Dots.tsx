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

const MAX_POINTS = 1000
const DOT_SIZE = 4

export const Dots: FC<{
  simulationIndex: number
  useSimulationsStore: UseSimulationsStore
  fillStyle?: string
  useSurface?: boolean
}> = ({ simulationIndex, useSimulationsStore, fillStyle, useSurface }) => {
  const positions = useMemo(() => new Float32Array(MAX_POINTS * 3), [])
  const attribute = useMemo(() => createAttribute(positions), [positions])
  const geometry = useMemo(() => createGeometry(attribute), [attribute])
  const texture = useMemo(() => createTexture(fillStyle), [fillStyle])
  const material = useMemo(() => createMaterial(texture), [texture])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const simulation = state.simulations?.[simulationIndex]
      const particles = useSurface ? simulation?.surface : simulation?.particles
      if (!particles) return
      particles.forEach((particle, i) => {
        positions[i * 3 + 0] = particle.position[0] ?? 0
        positions[i * 3 + 1] = particle.position[1] ?? 0
        positions[i * 3 + 2] = particle.position[2] ?? 0
      })
      geometry.setDrawRange(0, particles.length)
      attribute.needsUpdate = true
    })
  }, [
    useSurface,
    simulationIndex,
    useSimulationsStore,
    attribute,
    geometry,
    positions,
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

const createTexture = (fillStyle = 'rgba(255, 255, 255, 1)') => {
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
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.9,
    map: texture,
    size: DOT_SIZE,
  })
}
