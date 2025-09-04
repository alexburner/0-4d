import { Canvas, useFrame } from '@react-three/fiber'
import { times } from 'lodash'
import { FC, useMemo, useState } from 'react'
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
          position: [-20, 0, 40 * ZOOM],
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

const CLIP_PLANES = [
  new Plane(new Vector3(1, 0, 0), 0), // Clip negative x side
  new Plane(new Vector3(0, 0, -1), 0), // Clip positive z side
]

const MAX_RADIUS = 12
const GROWTH_SPEED = 0.01
const FADE_START_THRESHOLD = 0.5
const SPHERE_COUNT = 12
const SPHERE_GAP = MAX_RADIUS / SPHERE_COUNT

interface SphereState {
  radius: number
  opacity: number
}

const D0123R3F: FC = () => {
  const [sphereStates, setSphereStates] = useState<SphereState[]>(() =>
    times(SPHERE_COUNT, (i) => ({ radius: i * SPHERE_GAP, opacity: 1 })),
  )

  // Create reusable materials
  const materials = useMemo(
    () =>
      times(
        SPHERE_COUNT,
        () =>
          new MeshPhongMaterial({
            color: 0xffffff,
            side: DoubleSide,
            clipIntersection: true,
            clippingPlanes: CLIP_PLANES,
            transparent: true,
            opacity: 1,
          }),
      ),
    [],
  )

  useFrame(() => {
    // Update sphere states
    setSphereStates((prevStates) => {
      const newStates = [...prevStates]
      for (let index = 0; index < newStates.length; index++) {
        const currentState = newStates[index]
        if (!currentState) continue // for TS
        let newRadius = currentState.radius + GROWTH_SPEED
        let newOpacity = currentState.opacity

        // Check if we should start fading out
        if (newRadius >= MAX_RADIUS * FADE_START_THRESHOLD) {
          // Calculate fade progress (0 to 1 as we go from threshold to max)
          const fadeProgress =
            (newRadius - MAX_RADIUS * FADE_START_THRESHOLD) /
            (MAX_RADIUS - MAX_RADIUS * FADE_START_THRESHOLD)
          newOpacity = 1 - fadeProgress
        }

        // Reset when radius exceeds maximum
        if (newRadius > MAX_RADIUS) {
          newRadius = 0
          newOpacity = 1
        }

        newStates[index] = { radius: newRadius, opacity: newOpacity }

        // Update the material opacity directly instead of creating new materials
        const material = materials[index]
        if (!material) continue // for TS
        material.opacity = newOpacity
      }
      return newStates
    })
  })

  return (
    <group position={[0, 0, 0]}>
      {sphereStates.map((state, index) => (
        <mesh
          key={index}
          material={materials[index]}
          renderOrder={Math.ceil(100 * state.radius)}
        >
          <sphereGeometry args={[state.radius, 32, 32]} />
        </mesh>
      ))}
    </group>
  )
}
