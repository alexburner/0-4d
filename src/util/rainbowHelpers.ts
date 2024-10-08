import { scaleLinear } from 'd3-scale'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  PointsMaterial,
} from 'three'

export const RAINBOW_S = 0.895
export const RAINBOW_L = 0.295

export const ZERO_TOLERANCE = 0.0

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
    sizeAttenuation: true,
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
