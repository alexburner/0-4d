import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DynamicDrawUsage,
  Points,
  PointsMaterial,
} from 'three'
import { SimulationData } from '../../simulation/Simulation'

const MAX_POINTS = 1000
const DOT_SIZE = 4

const texture = ((): THREE.Texture => {
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
  return new CanvasTexture(canvas)
})()

export class Dots {
  private readonly positions: Float32Array
  private readonly posAttr: BufferAttribute
  private readonly geometry: BufferGeometry
  private readonly pointCloud: Points

  constructor() {
    this.positions = new Float32Array(MAX_POINTS * 3)
    this.posAttr = new BufferAttribute(this.positions, 3)
    this.posAttr.setUsage(DynamicDrawUsage)
    this.geometry = new BufferGeometry()
    this.geometry.setAttribute('position', this.posAttr)
    this.geometry.setDrawRange(0, 0)
    this.pointCloud = new Points(
      this.geometry,
      new PointsMaterial({
        blending: AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        opacity: 0.9,
        map: texture,
        size: DOT_SIZE,
      }),
    )
  }

  update({ particles }: SimulationData) {
    particles.forEach((particle, i) => {
      this.positions[i * 3 + 0] = particle.position[0] ?? 0
      this.positions[i * 3 + 1] = particle.position[1] ?? 0
      this.positions[i * 3 + 2] = particle.position[2] ?? 0
    })
    this.geometry.setDrawRange(0, particles.length)
    this.posAttr.needsUpdate = true
  }

  clear() {
    this.geometry.setDrawRange(0, 0)
  }

  getObject(): THREE.Object3D {
    return this.pointCloud
  }
}
