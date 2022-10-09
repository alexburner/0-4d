import { Group, Vector3 } from 'three'
import { makeSquarePlane } from '../plane'
import { AbstractView } from '../views/AbstractView'
import { RowArgs } from './Row'

const ROTATE_AXIS = new Vector3(0, 0, 1)

export class TimeCell {
  readonly group: Group
  readonly view: AbstractView

  private readonly dimensions: number

  constructor({ dimensions, radius, x, y, z, timeView }: RowArgs) {
    this.dimensions = dimensions
    this.view = timeView
    this.group = new Group()
    this.group.add(makeSquarePlane(radius))
    this.group.add(this.view.group)
    this.group.position.set(x, y, z)
    this.group.rotateOnAxis(new Vector3(0, 0, 1), -Math.PI / 2)
    this.group.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2)
  }

  rotate(spin: number) {
    if (this.dimensions < 2) return
    this.group.rotateOnAxis(ROTATE_AXIS, spin)
  }
}
