import { Group, Vector3 } from 'three'
import { SimulationData } from '../simulation/Simulation'
import { Dots } from './Dots'
import { makeSquarePlane } from './plane'
import { SpaceArgs } from './Row'
import { Trails } from './Trails'

const ROTATE_AXIS = new Vector3(1, 0, 0)

export class SpaceCell {
  private readonly dimensions: number
  private readonly group: Group
  private readonly dots: Dots
  private readonly trails: Trails

  constructor({ dimensions, radius, x, y, z }: SpaceArgs) {
    this.dimensions = dimensions
    this.dots = new Dots()
    this.trails = new Trails()
    this.group = new Group()
    this.group.add(makeSquarePlane(radius))
    this.group.add(this.dots.getObject())
    this.group.add(this.trails.getObject())
    this.group.position.set(x, y, z)
    this.group.rotateOnAxis(new Vector3(0, 0, 1), -Math.PI / 2)
  }

  update(data: SimulationData) {
    this.dots.update(data)
    this.trails.update(data)
  }

  rotate(spin: number) {
    if (this.dimensions < 3) return
    this.group.rotateOnAxis(ROTATE_AXIS, spin / 2)
  }

  getObject(): THREE.Object3D {
    return this.group
  }
}
