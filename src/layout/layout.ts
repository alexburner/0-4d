import { rotatePoint2D } from './util'

/**
 * Length = number of dimensions
 * Values = [x, y, z, ...etc]
 * Magnitude = 0-1
 */
type Point = number[]

const newPoint = (dimensionCount: number): Point =>
  new Array(dimensionCount).fill(null).map(() => Math.random())

const copyPoints = (points: Point[]): Point[] =>
  points.map((point) => point.map((n) => n))

/**
 * Lays out points in space
 * Optionally accepts prevPoints as a starting place
 * Assumes prevPoints are same dimesnions as nextPoints
 */
export const getLayout = ({
  dimensionCount,
  pointCount,
  prevPoints,
}: {
  dimensionCount: number
  pointCount: number
  prevPoints?: Point[]
}): Point[] => {
  // Create nextPoints, based on prevPoints, matching pointCount
  const nextPoints = prevPoints ? copyPoints(prevPoints) : []
  const diff = nextPoints.length - pointCount
  if (diff === 0) return nextPoints
  if (diff < 0) {
    for (let i = 0; i > diff; i--) {
      nextPoints.push(newPoint(dimensionCount))
    }
  } else {
    for (let i = 0; i < diff; i++) {
      nextPoints.pop()
    }
  }

  // Lay out points, according to dimensionCount
  switch (dimensionCount) {
    case 0:
      // no-op
      break
    case 1:
      layoutOne(nextPoints)
      break
    case 2:
      layoutTwo(nextPoints)
      break
    default:
      layoutN(nextPoints)
      break
  }

  return nextPoints
}

const layoutOne = (points: Point[]): void => {
  if (points.length === 0) return
  const half = Math.floor(points.length / 2)
  for (let i = 0, l = points.length; i < l; i++) {
    const point = points[i]
    if (!point) continue
    point[0] = half <= i ? 0 : 1
  }
}

const layoutTwo = (points: Point[]): void => {
  if (points.length === 0) return

  const centerX = 0
  const centerY = 0.5

  if (points.length === 1 && points[0]) {
    const point = points[0]
    point[0] = centerX
    point[1] = centerY
    return
  }

  const full = Math.PI * 2
  const slice = full / points.length

  for (let i = 0, l = points.length; i < l; i++) {
    const point = points[i]
    if (!point) continue
    const startX = 0
    const startY = 0
    const angle = slice * i
    const [x, y] = rotatePoint2D(startX, startY, centerX, centerY, angle)
    point[0] = x
    point[1] = y
  }
}

const layoutN = (points: Point[]): void => {
  // TODO - simulate points around sphere
  const half = Math.floor(points.length / 2)
  for (let i = 0, l = points.length; i < l; i++) {
    const point = points[i]
    if (!point) continue
    point[0] = half <= i ? 0 : 1
  }
}
