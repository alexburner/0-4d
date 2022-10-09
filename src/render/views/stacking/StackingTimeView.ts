import { Group } from 'three'
import { SimulationData } from '../../../simulation/Simulation'
import { AbstractView } from '../AbstractView'
import { Dots } from '../Dots'
import { TimeLines } from '../TimeLines'

export class StackingTimeView extends AbstractView {
  readonly group: Group

  private readonly dots: Dots
  private readonly timeLines: TimeLines

  constructor() {
    super()
    this.dots = new Dots()
    this.timeLines = new TimeLines()
    this.group = new Group()
    this.group.add(this.dots.getObject())
    this.group.add(this.timeLines.getObject())
  }

  update(data: SimulationData) {
    this.dots.update(data)
    this.timeLines.update(data)
  }
}
