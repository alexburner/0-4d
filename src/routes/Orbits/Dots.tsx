import { FC, useEffect, useMemo, useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry } from 'three'
import { useSimulationsStore } from './Orbits'

const MAX_POINTS = 1000
const DOT_SIZE = 4

export const Dots: FC<{ simulationIndex: number }> = ({ simulationIndex }) => {
  const canvas = useMemo(createDotCanvas, [])
  const positionsRef = useRef(new Float32Array(MAX_POINTS * 3))
  const geometryRef = useRef<BufferGeometry>(null)
  const attributeRef = useRef<BufferAttribute>(null)
  useEffect(
    () =>
      useSimulationsStore.subscribe((state) => {
        const particles = state.simulations?.[simulationIndex]?.particles
        const positions = positionsRef.current
        const geometry = geometryRef.current
        const attribute = attributeRef.current
        if (!particles || !geometry || !attribute) return
        particles.forEach((particle, i) => {
          positions[i * 3 + 0] = particle.position[0] ?? 0
          positions[i * 3 + 1] = particle.position[1] ?? 0
          positions[i * 3 + 2] = particle.position[2] ?? 0
        })
        geometry.setDrawRange(0, particles.length)
        attribute.needsUpdate = true
      }),
    [simulationIndex],
  )
  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          ref={attributeRef}
          attach="attributes-position"
          count={positionsRef.current.length}
          array={positionsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        blending={AdditiveBlending}
        depthTest={false}
        depthWrite={false}
        transparent={true}
        opacity={0.9}
        size={DOT_SIZE}
      >
        <canvasTexture attach="map" image={canvas} />
      </pointsMaterial>
    </points>
  )
}

const createDotCanvas = () => {
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
  context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.fill()
  return canvas
}
