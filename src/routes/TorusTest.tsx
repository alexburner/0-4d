import { Canvas } from '@react-three/fiber'
import { FC } from 'react'

const CANVAS_WIDTH = 1840
const CANVAS_HEIGHT = 1080
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 1

const BACKGROUND_COLOR = '#222'

const rightAngle = Math.PI / 2

export const TorusTest: FC = () => {
  return (
    <div
      style={{
        width: `${CANVAS_WIDTH}px`,
        height: `${CANVAS_HEIGHT}px`,
        background: BACKGROUND_COLOR,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Canvas
        resize={{ scroll: false }}
        camera={{
          fov: VIEWANGLE,
          aspect: CANVAS_WIDTH / CANVAS_HEIGHT,
          near: NEAR,
          far: FAR,
          position: [0, 0, 40 * ZOOM],
        }}
        style={{ background: BACKGROUND_COLOR }}
      >
        <TorusTestR3F />
      </Canvas>
    </div>
  )
}

const TorusTestR3F: FC = () => {
  return (
    <group rotation={[-rightAngle + 0.5, 0, 0]}>
      <mesh visible>
        <torusGeometry args={[10, 3, 16, 100]} />
        <meshBasicMaterial color={0xffff00} />
      </mesh>
    </group>
  )
}
