import { scaleLinear } from 'd3-scale'
import {
  BufferAttribute,
  DynamicDrawUsage,
  BufferGeometry,
  PointsMaterial,
  AdditiveBlending,
} from 'three'

export const createBufferAttr = (values: Float32Array) => {
  const attribute = new BufferAttribute(values, 3)
  attribute.setUsage(DynamicDrawUsage)
  return attribute
}

export const createGeometry = (args: {
  positionsAttr: BufferAttribute
  colorsAttr: BufferAttribute
}) => {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', args.positionsAttr)
  geometry.setAttribute('color', args.colorsAttr)
  geometry.setDrawRange(0, 0)
  return geometry
}

export const createMaterial = (size: number, opacity = 0.9) => {
  return new PointsMaterial({
    blending: AdditiveBlending,
    vertexColors: true,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity,
    size,
  })
}

export const createHueScale = (radius: number) =>
  scaleLinear()
    .domain([0, radius * radius])
    .range([1, 0.6])
