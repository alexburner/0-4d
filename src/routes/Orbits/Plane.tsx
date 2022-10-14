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

export const SquarePlane: FC<{ radius: number }> = ({ radius }) => {
  const vectors = useMemo<Vector[]>(
    () => [
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
    ],
    [radius],
  )
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
    attribute.needsUpdate = true
    geometry.setDrawRange(0, lineCount * 2)
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
  // geometry.computeBoundingSphere()
  geometry.setDrawRange(0, 0)
  return geometry
}

const createMaterial = () => {
  return new LineBasicMaterial({
    blending: AdditiveBlending,
    transparent: true,
    color: 0x309bff,
    opacity: 0.4,
    depthTest: false,
  })
}
