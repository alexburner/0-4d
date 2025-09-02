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
          position: [-30, 0, 40 * ZOOM],
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

const D0123R3F: FC = () => {
  const [sphereStates, setSphereStates] = useState<
    { radius: number; opacity: number }[]
  >([
    { radius: 0, opacity: 1 },
    { radius: 2, opacity: 1 },
    { radius: 4, opacity: 1 },
    { radius: 6, opacity: 1 },
    { radius: 8, opacity: 1 },
    { radius: 10, opacity: 1 },
  ])
  const maxRadius = 10
  const growthSpeed = 0.05 // Radius increase per frame
  const fadeStartThreshold = 0.5 // Start fading at 95% of max radius

  useFrame(() => {
    // Update sphere states
    setSphereStates((prevStates) => {
      const newStates = [...prevStates]
      for (let index = 0; index < newStates.length; index++) {
        const currentState = newStates[index]
        if (!currentState) continue
        let newRadius = currentState.radius + growthSpeed
        let newOpacity = currentState.opacity

        // Check if we should start fading out
        if (newRadius >= maxRadius * fadeStartThreshold) {
          // Calculate fade progress (0 to 1 as we go from threshold to max)
          const fadeProgress =
            (newRadius - maxRadius * fadeStartThreshold) /
            (maxRadius - maxRadius * fadeStartThreshold)
          newOpacity = 1 - fadeProgress
        }

        // Reset when radius exceeds maximum
        if (newRadius > maxRadius) {
          newRadius = 0
          newOpacity = 1
        }

        newStates[index] = { radius: newRadius, opacity: newOpacity }
      }
      return newStates
    })
  })

  return (
    <group position={[0, 0, 0]}>
      {sphereStates.map((state, index) => {
        const material = new MeshPhongMaterial({
          color: 0xffffff,
          side: DoubleSide,
          clipIntersection: true,
          clippingPlanes: clipPlanes,
          transparent: true,
          opacity: state.opacity,
        })

        return (
          <mesh key={index} material={material}>
            <sphereGeometry args={[state.radius, 32, 32]} />
          </mesh>
        )
      })}
    </group>
  )
}
