import { Canvas } from '@react-three/fiber'
import { FC } from 'react'

export const App: FC = () => (
  <Canvas>
    <mesh>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  </Canvas>
)
