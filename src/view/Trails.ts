import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  DynamicDrawUsage,
  Points,
  PointsMaterial,
} from 'three'
import { cloneParticle, Particle } from '../simulation/Particle'
import { SimulationData } from '../simulation/Simulation'
import { RecentQueue } from '../util/RecentQueue'

const TRAIL_LENGTH = 200
const MAX_POINTS = TRAIL_LENGTH * 100
const DOT_SIZE = 1

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

export class Trails {
  protected trailLength: number = TRAIL_LENGTH
  protected particleQueues: RecentQueue<Particle>[] = []
  private readonly positions: Float32Array
  private readonly posAttr: THREE.BufferAttribute
  private readonly geometry: THREE.BufferGeometry
  private readonly pointCloud: THREE.Points

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
    // (maybe) Add queues to fit
    while (this.particleQueues.length < particles.length) {
      this.particleQueues.push(new RecentQueue<Particle>(this.trailLength))
    }

    // (maybe) Remove queues to fit
    while (this.particleQueues.length > particles.length) {
      this.particleQueues.pop()
    }

    // Add new particles to queues
    this.particleQueues.forEach((particleQueue, i) => {
      const particle = particles[i]
      if (!particle) throw new Error('Unreachable')
      particleQueue.add(cloneParticle(particle))
    })

    // Update rendered positions
    let drawCount = 0
    this.particleQueues.forEach((particleQueue) => {
      particleQueue.values().forEach((particle) => {
        this.positions[drawCount * 3 + 0] = particle.position[0] ?? 0
        this.positions[drawCount * 3 + 1] = particle.position[1] ?? 0
        this.positions[drawCount * 3 + 2] = particle.position[2] ?? 0
        drawCount++
      })
    })
    this.geometry.setDrawRange(0, drawCount)
    this.posAttr.needsUpdate = true
  }

  clear(): void {
    this.geometry.setDrawRange(0, 0)
    this.particleQueues = []
  }

  getObject(): THREE.Object3D {
    return this.pointCloud
  }
}

export class TimeTrails extends Trails {
  private readonly trailGap = 1 / 4

  constructor() {
    super()
    this.trailLength = 800
  }

  update(data: SimulationData) {
    // Give each existing particle a nudge in z space
    this.particleQueues.forEach((particleQueue) => {
      particleQueue.values().forEach((particle) => {
        const z = particle.position[2] ?? 0
        particle.position[2] = z - this.trailGap
      })
    })

    // Plain Trail update
    super.update(data)
  }
}
