import { times } from 'lodash'
import {
  AdditiveBlending,
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Vector3,
} from 'three'

const material = new LineBasicMaterial({
  blending: AdditiveBlending,
  transparent: true,
  color: 0x309bff,
  opacity: 0.4,
})

const makePlane = (vectors: [number, number, number][]) => {
  const group = new Group()
  times(vectors.length, (i) => {
    if (i % 2) return // only do evens, each pair
    const source = vectors[i]
    const target = vectors[i + 1]
    if (!source || !target) throw new Error('Odd plane vectors')
    const source3 = new Vector3(...source)
    const target3 = new Vector3(...target)
    const geometry = new BufferGeometry()
    geometry.setFromPoints([source3, target3])
    const line = new Line(geometry, material)
    line.computeLineDistances()
    group.add(line)
  })
  return group
}

export const makeSquarePlane = (radius: number) =>
  makePlane([
    // x axis
    [-radius, 0, 0],
    [radius, 0, 0],
    // y axis
    [0, -radius, 0],
    [0, radius, 0],
    // square
    [radius, -radius, 0],
    [radius, radius, 0],
    [-radius, -radius, 0],
    [-radius, radius, 0],
    [-radius, -radius, 0],
    [radius, -radius, 0],
    [-radius, radius, 0],
    [radius, radius, 0],
  ])
