import { useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import { Mesh, Vector3 } from 'three'

const ROTATE_AXIS = new Vector3(1, 0, 0)

export const SpinningBox: FC = () => {
  const meshRef = useRef<Mesh>(null)
  useFrame((_state, delta) => {
    meshRef.current?.rotateOnAxis(ROTATE_AXIS, delta)
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}
