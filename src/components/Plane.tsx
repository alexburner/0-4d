import { times } from 'lodash'
import { FC, useEffect, useMemo } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  LineBasicMaterial,
} from 'three'

type Vector = [number, number, number]

export const SpaceGrid: FC<{
  radius: number
  time?: true
}> = ({ radius }) => {
  // const top = time ? -163 - radius : -radius
  const top = -radius
  const vectors = useMemo(() => {
    const v: Vector[] = [
      /* lines */
      // // x axis
      // [-radius, 0, 0],
      // [radius, 0, 0],
      // // y axis
      // [0, -radius, 0],
      // [0, radius, 0],
      // // z axis
      // [0, 0, top],
      // [0, 0, radius],

      /* squares */
      // // xy square
      // [radius, -radius, 0],
      // [radius, radius, 0],
      // [-radius, -radius, 0],
      // [-radius, radius, 0],
      // [-radius, -radius, 0],
      // [radius, -radius, 0],
      // [-radius, radius, 0],
      // [radius, radius, 0],
      // // yz square
      // [0, radius, top],
      // [0, radius, radius],
      // [0, -radius, top],
      // [0, -radius, radius],
      // [0, -radius, top],
      // [0, radius, top],
      // [0, -radius, radius],
      // [0, radius, radius],
      // // xz square
      // [radius, 0, top],
      // [radius, 0, radius],
      // [-radius, 0, top],
      // [-radius, 0, radius],
      // [-radius, 0, top],
      // [radius, 0, top],
      // [-radius, 0, radius],
      // [radius, 0, radius],

      /* cube */
      // top xy square
      [radius, -radius, top],
      [radius, radius, top],
      [-radius, -radius, top],
      [-radius, radius, top],
      [-radius, -radius, top],
      [radius, -radius, top],
      [-radius, radius, top],
      [radius, radius, top],
      // bottom xy square
      [radius, -radius, radius],
      [radius, radius, radius],
      [-radius, -radius, radius],
      [-radius, radius, radius],
      [-radius, -radius, radius],
      [radius, -radius, radius],
      [-radius, radius, radius],
      [radius, radius, radius],
    ]
    // if (time) {
    //   const topBottom = top + radius
    //   const bottom = radius
    //   const bottomTop = 0
    //   const sides: Vector[] = [
    //     // xy corner z axes — top
    //     [-radius, -radius, top],
    //     [-radius, -radius, topBottom],
    //     [radius, -radius, top],
    //     [radius, -radius, topBottom],
    //     [-radius, radius, top],
    //     [-radius, radius, topBottom],
    //     [radius, radius, top],
    //     [radius, radius, topBottom],
    //     // xy corner z axes — bottom
    //     [-radius, -radius, bottomTop],
    //     [-radius, -radius, bottom],
    //     [radius, -radius, bottomTop],
    //     [radius, -radius, bottom],
    //     [-radius, radius, bottomTop],
    //     [-radius, radius, bottom],
    //     [radius, radius, bottomTop],
    //     [radius, radius, bottom],
    //   ]
    //   v.push(...sides)
    // } else {
    const sides: Vector[] = [
      // xy corner z axes
      [-radius, -radius, top],
      [-radius, -radius, radius],
      [radius, -radius, top],
      [radius, -radius, radius],
      [-radius, radius, top],
      [-radius, radius, radius],
      [radius, radius, top],
      [radius, radius, radius],
    ]
    v.push(...sides)
    // }
    return v
  }, [radius, top])
  return <Plane vectors={vectors} />
}

const Plane: FC<{ vectors: Vector[] }> = ({ vectors }) => {
  const positions = useMemo(
    () => new Float32Array(vectors.length * 3),
    [vectors],
  )
  const attribute = useMemo(() => createAttribute(positions), [positions])
  const geometry = useMemo(() => createGeometry(attribute), [attribute])
  const material = useMemo(() => createMaterial(), [])

  useEffect(() => {
    let posIndex = 0
    let lineCount = 0
    times(vectors.length, (i) => {
      if (i % 2) return // only do evens, each pair
      const source = vectors[i]
      const target = vectors[i + 1]
      if (!source || !target) throw new Error('Odd plane vectors')
      positions[posIndex++] = source[0]
      positions[posIndex++] = source[1]
      positions[posIndex++] = source[2]
      positions[posIndex++] = target[0]
      positions[posIndex++] = target[1]
      positions[posIndex++] = target[2]
      lineCount++
    })
    geometry.setDrawRange(0, lineCount * 2)
    attribute.needsUpdate = true
  }, [attribute, geometry, positions, vectors])

  return <lineSegments geometry={geometry} material={material} />
}

const createAttribute = (positions: Float32Array) => {
  const attribute = new BufferAttribute(positions, 3)
  attribute.setUsage(DynamicDrawUsage)
  return attribute
}

const createGeometry = (attribute: BufferAttribute) => {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', attribute)
  geometry.setDrawRange(0, 0)
  return geometry
}

const createMaterial = () => {
  return new LineBasicMaterial({
    blending: AdditiveBlending,
    color: 0x309bff,
    depthTest: false,
    opacity: 0.1,
    transparent: true,
  })
}
