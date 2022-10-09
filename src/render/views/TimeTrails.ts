import { SimulationData } from '../../simulation/Simulation'
import { Trails } from './Trails'

export class TimeTrails extends Trails {
  private readonly trailGap = 1 / 4

  constructor() {
    super()
    this.trailLength = 1200
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
