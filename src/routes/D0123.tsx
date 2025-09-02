import { Canvas, useFrame } from '@react-three/fiber'
import { FC, useState } from 'react'
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
          position: [-40, 0, 40 * ZOOM],
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
  const [sphereRadii, setSphereRadii] = useState<number[]>([0, 2, 4, 6, 8, 10])
  const maxRadius = 10
  const growthSpeed = 0.05 // Radius increase per frame

  useFrame(() => {
    // Update sphere radii
    setSphereRadii((prevRadii) => {
      const newRadii = [...prevRadii]
      for (let index = 0; index < newRadii.length; index++) {
        let newRadius = newRadii[index]
        if (newRadius === undefined) throw new Error('Unreachable')
        newRadius += growthSpeed
        if (newRadius > maxRadius) newRadius = 0
        newRadii[index] = newRadius
      }
      return newRadii
    })
  })

  return (
    <group position={[0, 0, 0]}>
      {sphereRadii.map((radius, index) => (
        <mesh key={index} material={sphereMaterial}>
          <sphereGeometry args={[radius, 32, 32]} />
        </mesh>
      ))}
    </group>
  )
}
