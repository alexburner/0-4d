export const rotatePoint2D = (
  startX: number,
  startY: number,
  centerX: number,
  centerY: number,
  radians: number,
): [number, number] => {
  const shiftedX = startX - centerX
  const shiftedY = startY - centerY
  const sin = Math.sin(radians)
  const cos = Math.cos(radians)
  const rotatedX = shiftedX * cos - shiftedY * sin
  const rotatedY = shiftedX * sin + shiftedY * cos
  const endX = rotatedX + centerX
  const endY = rotatedY + centerY
  return [endX, endY]
}
