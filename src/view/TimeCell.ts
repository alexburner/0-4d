import { Group, Object3D, Vector3 } from 'three'
import { SimulationData } from '../simulation/Simulation'
import { Dots } from './Dots'
import { makeSquarePlane } from './plane'
import { SpaceArgs } from './Row'
import { TimeTrails } from './Trails'

const ROTATE_AXIS = new Vector3(0, 0, 1)

export class TimeCell {
  private readonly dimensions: number
  private readonly group: THREE.Group
  private readonly dots: Dots
  private readonly timeTrails: TimeTrails

  constructor({ dimensions, radius, x, y, z }: SpaceArgs) {
    this.dimensions = dimensions
    this.dots = new Dots()
    this.timeTrails = new TimeTrails()
    this.group = new Group()
    this.group.add(makeSquarePlane(radius))
    this.group.add(this.dots.getObject())
    this.group.add(this.timeTrails.getObject())
    this.group.position.set(x, y, z)
    this.group.rotateOnAxis(new Vector3(0, 0, 1), -Math.PI / 2)
    this.group.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2)
  }

  update(data: SimulationData) {
    this.dots.update(data)
    this.timeTrails.update(data)
  }

  rotate(spin: number) {
    if (this.dimensions < 2) return
    this.group.rotateOnAxis(ROTATE_AXIS, spin)
  }

  getObject(): Object3D {
    return this.group
  }
}
