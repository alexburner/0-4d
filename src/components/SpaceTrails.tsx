import { FC, useEffect, useMemo } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DynamicDrawUsage,
  PointsMaterial,
} from 'three'
import { cloneParticle, Particle } from '../simulation/particles'
import { UseSimulationsStore } from '../stores/simulationStore'
import { RecentQueue } from '../util/RecentQueue'

const TRAIL_LENGTH = 200
const MAX_POINTS = TRAIL_LENGTH * 100
const DOT_SIZE = 1

export const SpaceTrails: FC<{
  simulationIndex: number
  useSimulationsStore: UseSimulationsStore
  fillStyle?: string
  isSurface?: boolean
}> = ({ simulationIndex, useSimulationsStore, fillStyle, isSurface }) => {
  const positions = useMemo(() => new Float32Array(MAX_POINTS * 3), [])
  const attribute = useMemo(() => createAttribute(positions), [positions])
  const geometry = useMemo(() => createGeometry(attribute), [attribute])
  const texture = useMemo(() => createTexture(fillStyle), [fillStyle])
  const material = useMemo(() => createMaterial(texture), [texture])
  const trailQueues = useMemo<RecentQueue<Particle>[]>(() => [], [])

  useEffect(() => {
    useSimulationsStore.subscribe((state) => {
      const simulation = state.simulations?.[simulationIndex]
      const particles = isSurface ? simulation?.surface : simulation?.particles
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
          drawCount++
        })
      })
      geometry.setDrawRange(0, drawCount)
      attribute.needsUpdate = true
    })
  }, [
    isSurface,
    simulationIndex,
    useSimulationsStore,
    attribute,
    geometry,
    positions,
    trailQueues,
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
    sizeAttenuation: true,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.9,
    map: texture,
    size: DOT_SIZE,
  })
}
