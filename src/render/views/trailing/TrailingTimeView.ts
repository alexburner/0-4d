import { Group } from 'three'
import { SimulationData } from '../../../simulation/Simulation'
import { AbstractView } from '../AbstractView'
import { Dots } from './Dots'
import { TimeTrails } from './Trails'

export class TrailingTimeView extends AbstractView {
  readonly group: Group

  private readonly dots: Dots
  private readonly timeTrails: TimeTrails

  constructor() {
    super()
    this.dots = new Dots()
    this.timeTrails = new TimeTrails()
    this.group = new Group()
    this.group.add(this.dots.getObject())
    this.group.add(this.timeTrails.getObject())
  }

  update(data: SimulationData) {
    this.dots.update(data)
    this.timeTrails.update(data)
  }
}
