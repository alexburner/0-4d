import { Group } from 'three'
import { SimulationData } from '../../simulation/Simulation'
import { AbstractView } from '../views/AbstractView'
import { SpaceCell } from './SpaceCell'
import { TimeCell } from './TimeCell'

export interface RowArgs {
  dimensions: number
  radius: number
  x: number
  y: number
  z: number
  spaceView: AbstractView
  timeView: AbstractView
}

export class Row {
  readonly group: Group

  private readonly spaceCell: SpaceCell
  private readonly timeCell: TimeCell

  constructor({ dimensions, radius, x, y, z, spaceView, timeView }: RowArgs) {
    this.spaceCell = new SpaceCell({
      dimensions,
      radius,
      x: -110,
      y: 0,
      z: 0,
      spaceView,
      timeView,
    })

    this.timeCell = new TimeCell({
      dimensions,
      radius,
      x: -70,
      y: 0,
      z: 0,
      spaceView,
      timeView,
    })

    this.group = new Group()
    this.group.position.set(x, y, z)
    this.group.add(this.spaceCell.group)
    this.group.add(this.timeCell.group)
  }

  update(data: SimulationData) {
    this.spaceCell.view.update(data)
    this.timeCell.view.update(data)
  }

  rotate(spin: number) {
    this.spaceCell.rotate(spin)
    this.timeCell.rotate(spin)
  }
}
