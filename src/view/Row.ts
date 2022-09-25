import { Group } from 'three'
import { SimulationData } from '../simulation/Simulation'
import { SpaceCell } from './SpaceCell'
import { TimeCell } from './TimeCell'

export interface SpaceArgs {
  dimensions: number
  radius: number
  x: number
  y: number
  z: number
}

export class Row {
  private readonly group: Group
  private readonly spaceCell: SpaceCell
  private readonly timeCell: TimeCell

  constructor({ dimensions, radius, x, y, z }: SpaceArgs) {
    this.spaceCell = new SpaceCell({
      dimensions,
      radius,
      x: -110,
      y: 0,
      z: 0,
    })

    this.timeCell = new TimeCell({
      dimensions,
      radius,
      x: -70,
      y: 0,
      z: 0,
    })

    this.group = new Group()
    this.group.position.set(x, y, z)
    this.group.add(this.spaceCell.getObject())
    this.group.add(this.timeCell.getObject())
  }

  update(data: SimulationData) {
    this.spaceCell.update(data)
    this.timeCell.update(data)
  }

  rotate(spin: number) {
    this.spaceCell.rotate(spin)
    this.timeCell.rotate(spin)
  }

  getObject(): THREE.Object3D {
    return this.group
  }
}
