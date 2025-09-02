import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { FC } from 'react'
import { DoubleSide, MeshPhongMaterial, Plane, Vector3 } from 'three'

const CANVAS_WIDTH = 1840
const CANVAS_HEIGHT = 1080
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 1

const BACKGROUND_COLOR = '#222'

export const D0123: FC = () => {
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
        gl={{ localClippingEnabled: true }}
      >
        <directionalLight position={[0, 0, 5]} />
        <D0123R3F />
      </Canvas>
    </div>
  )
}

const clipPlanes = [
  new Plane(new Vector3(1, 0, 0), 0), // Clip negative x side
  new Plane(new Vector3(0, 0, -1), 0), // Clip positive z side
]

const sphereMaterial = new MeshPhongMaterial({
  color: 0xffffff,
  side: DoubleSide,
  clipIntersection: true,
  clippingPlanes: clipPlanes,
})

const D0123R3F: FC = () => {
  const { camera } = useThree()

  useFrame((state, _delta) => {
    // Orbit camera around the spheres in a circular path
    const rotationSpeed = 0.5 // radians per second
    const radius = 40 // distance from center
    const time = state.clock.elapsedTime * rotationSpeed

    // Calculate new camera position in circular orbit
    camera.position.x = Math.sin(time) * radius
    camera.position.z = Math.cos(time) * radius
    camera.position.y = 0

    // Keep camera pointed at the center
    camera.lookAt(0, 0, 0)
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh material={sphereMaterial}>
        <sphereGeometry args={[10, 32, 32]} />
      </mesh>
      <mesh material={sphereMaterial}>
        <sphereGeometry args={[8, 32, 32]} />
      </mesh>
      <mesh material={sphereMaterial}>
        <sphereGeometry args={[6, 32, 32]} />
      </mesh>
    </group>
  )
}
