import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  LineBasicMaterial,
  LineSegments,
  Object3D,
} from 'three'
import { SimulationData } from '../../simulation/Simulation'
import { RecentQueue } from '../../util/RecentQueue'

const MAX_NEIGHBORS = 100
const STACK_COUNT = 80
const STACK_GAP = 5
const POINT_COUNT = MAX_NEIGHBORS * STACK_COUNT * 3

export class TimeLines {
  private readonly simulationQueue: RecentQueue<SimulationData>
  private readonly geometry: BufferGeometry
  private readonly lineSegments: LineSegments
  private readonly positions: Float32Array
  private readonly posAttr: BufferAttribute

  constructor() {
    this.simulationQueue = new RecentQueue(STACK_COUNT)

    this.positions = new Float32Array(POINT_COUNT)
    this.posAttr = new BufferAttribute(this.positions, 3)
    this.posAttr.setUsage(DynamicDrawUsage)

    this.geometry = new BufferGeometry()
    this.geometry.setAttribute('position', this.posAttr)
    this.geometry.computeBoundingSphere()
    this.geometry.setDrawRange(0, 0)

    this.lineSegments = new LineSegments(
      this.geometry,
      new LineBasicMaterial({
        transparent: true,
        color: 0xffffff,
        opacity: 0.6,
        blending: AdditiveBlending,
        depthTest: false,
      }),
    )
  }

  update(nextSimulation: SimulationData) {
    // Nudge existing simulation positions
    this.simulationQueue.values().forEach((simulation) => {
      simulation.particles.forEach((particle) => {
        const z = particle.position[2] ?? 0
        particle.position[2] = z - STACK_GAP
      })
    })

    // Add latest simulation result to queue
    this.simulationQueue.add(nextSimulation)

    // Write new line segment positions
    let posIndex = 0
    let lineCount = 0
    this.simulationQueue.values().forEach((simulation) => {
      simulation.particles.forEach((particle, i) => {
        simulation.neighborhood[i]?.forEach((neighbor) => {
          const other = simulation.particles[neighbor.index]
          if (!other) return
          this.positions[posIndex++] = particle.position[0] ?? 0
          this.positions[posIndex++] = particle.position[1] ?? 0
          this.positions[posIndex++] = particle.position[2] ?? 0
          this.positions[posIndex++] = other.position[0] ?? 0
          this.positions[posIndex++] = other.position[1] ?? 0
          this.positions[posIndex++] = other.position[2] ?? 0
          lineCount++
        })
      })
    })
    this.posAttr.needsUpdate = true
    const drawRange = lineCount * 2
    this.geometry.setDrawRange(0, drawRange)
  }

  getObject(): Object3D {
    return this.lineSegments
  }
}
