import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { times } from 'lodash'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { Dots } from '../components/Dots'
import { SquarePlane } from '../components/Plane'
import { SpaceTrails } from '../components/SpaceTrails'
import { TimeTrails } from '../components/TimeTrails'
import { createWorkers } from '../simulation/createWorkers'
import { makeParticlesThroughDimensions } from '../simulation/particles'
import { useSimulationsStore } from '../stores/simulationStore'
import { HashRoute } from '../util/hashRoute'

const WIDTH = 1080
const HEIGHT = 920
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 7

const PARTICLE_COUNT = 12
const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

const SPIN = 0.0125 / 2

export const Orbits: FC<{ route: HashRoute }> = ({ route }) => (
  <div style={{ width: `${WIDTH}px`, height: `${HEIGHT}px`, margin: 'auto' }}>
    <Canvas
      camera={{
        fov: VIEWANGLE,
        aspect: WIDTH / HEIGHT,
        near: NEAR,
        far: FAR,
        position: [0, 0, 40 * ZOOM],
      }}
    >
      <OrbitsR3F route={route} />
    </Canvas>
  </div>
)

const OrbitsR3F: FC<{ route: HashRoute }> = ({ route }) => {
  console.log(route) // TODO allow route-based params

  /**
   * Create simulation particles
   */

  const particlesByDimension = useMemo(
    () =>
      makeParticlesThroughDimensions(
        DIMENSION_COUNT,
        PARTICLE_COUNT,
        SIMULATION_RADIUS,
      ),
    [],
  )

  /**
   * Create simulation workers
   */

  const workers = useMemo(() => createWorkers(DIMENSION_COUNT), [])
  const workersReadyRef = useRef(false)
  useEffect(() => {
    // Init workers on mount
    const initPromises = workers.map((worker, i) => {
      const particles = particlesByDimension[i]
      if (!particles) throw new Error('Unreachable')
      return worker.init(particles, {
        behavior: {
          name: 'orbiting',
          config: {
            mass: {
              g: 1,
              orbiter: 10,
              attractor: 30,
            },
            distance: {
              min: 50,
              max: 250,
            },
          },
        },
        bounding: 'centerScaling',
        radius: SIMULATION_RADIUS,
        maxSpeed: 1,
      })
    })

    // Mark workers as ready to tick, after init
    void Promise.all(initPromises).then(() => (workersReadyRef.current = true))

    return () => {
      // Release workers on dismount
      workers.forEach((worker) => worker[releaseProxy]())
    }
  }, [particlesByDimension, workers])

  /**
   * Each frame, tick simulation workers & update store
   */

  const updateSimulations = useSimulationsStore(
    (state) => state.updateSimulations,
  )
  const tickWorkers = async () => {
    const updates = await Promise.all(workers.map((worker) => worker.tick()))
    updateSimulations(updates)
  }
  useFrame(() => workersReadyRef.current && void tickWorkers())

  /**
   * Render scene
   */

  return (
    <>
      {times(DIMENSION_COUNT, (i) => (
        <group key={i} position={[0, 85 - i * (3.5 * 12), 0]}>
          <SpaceCell simulationIndex={i} />
          <TimeCell simulationIndex={i} />
        </group>
      ))}
    </>
  )
}

const xAxis = new Vector3(1, 0, 0)
const zAxis = new Vector3(0, 0, 1)
const rightAngle = Math.PI / 2

const SpaceCell: FC<{ simulationIndex: number }> = ({ simulationIndex }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    if (simulationIndex < 3) return
    groupRef.current?.rotateOnAxis(xAxis, SPIN)
  })
  return (
    <group ref={groupRef} position={[-110, 0, 0]}>
      <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SpaceTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SquarePlane radius={SIMULATION_RADIUS} />
    </group>
  )
}

const TimeCell: FC<{ simulationIndex: number }> = ({ simulationIndex }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    if (simulationIndex < 2) return
    groupRef.current?.rotateOnAxis(zAxis, SPIN)
  })
  return (
    <group ref={groupRef} position={[-70, 0, 0]}>
      <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <TimeTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SquarePlane radius={SIMULATION_RADIUS} />
    </group>
  )
}
