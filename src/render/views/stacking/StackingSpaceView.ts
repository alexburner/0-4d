import { Group } from 'three'
import { SimulationData } from '../../../simulation/Simulation'
import { AbstractView } from '../AbstractView'
import { Dots } from '../Dots'
import { Lines } from '../Lines'

export class StackingSpaceView extends AbstractView {
  readonly group: Group

  private readonly dots: Dots
  private readonly lines: Lines

  constructor() {
    super()
    this.dots = new Dots()
    this.lines = new Lines()
    this.group = new Group()
    this.group.add(this.dots.getObject())
    this.group.add(this.lines.getObject())
  }

  update(data: SimulationData) {
    this.dots.update(data)
    this.lines.update(data)
  }
}
