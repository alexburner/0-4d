import { Group } from 'three'
import { SimulationData } from '../../simulation/Simulation'

export abstract class AbstractView {
  abstract readonly group: Group
  abstract update(data: SimulationData): void
}
