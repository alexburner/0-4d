import { Group } from 'three'
import { SimulationData } from '../../../simulation/Simulation'
import { AbstractView } from '../AbstractView'
import { Dots } from '../Dots'
import { Trails } from '../Trails'

export class TrailingSpaceView extends AbstractView {
  readonly group: Group

  private readonly dots: Dots
  private readonly trails: Trails

  constructor() {
    super()
    this.dots = new Dots()
    this.trails = new Trails()
    this.group = new Group()
    this.group.add(this.dots.getObject())
    this.group.add(this.trails.getObject())
  }

  update(data: SimulationData) {
    this.dots.update(data)
    this.trails.update(data)
  }
}
