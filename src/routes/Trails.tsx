import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber, times } from 'lodash'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { Dots } from '../components/Dots'
import { SquarePlane } from '../components/Plane'
import { SpaceTrails } from '../components/SpaceTrails'
import { TimeTrails } from '../components/TimeTrails'
import { behaviors, isBehaviorName, isBounding } from '../simulation/configs'
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

const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPIN = 0.0125 / 2
const DEFAULT_BEHAVIOR_NAME = 'orbiting'
const DEFAULT_BOUNDING = 'centerScaling'

export const Trails: FC<{ route: HashRoute }> = ({ route }) => (
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
      <TrailsR3F route={route} />
    </Canvas>
  </div>
)

const TrailsR3F: FC<{ route: HashRoute }> = ({ route }) => {
  /**
   * Extract any URL params
   */

  const particleCount = isNumber(route.params['particles'])
    ? route.params['particles']
    : DEFAULT_PARTICLE_COUNT
  const spin = isNumber(route.params['spin'])
    ? route.params['spin']
    : DEFAULT_SPIN
  const behaviorName = isBehaviorName(route.params['behavior'])
    ? route.params['behavior']
    : DEFAULT_BEHAVIOR_NAME
  const behavior = behaviors[behaviorName]
  const bounding = isBounding(route.params['bounding'])
    ? route.params['bounding']
    : DEFAULT_BOUNDING

  /**
   * Create simulation particles
   */

  const particlesByDimension = useMemo(
    () =>
      makeParticlesThroughDimensions(
        DIMENSION_COUNT,
        particleCount,
        SIMULATION_RADIUS,
      ),
    [particleCount],
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
        behavior,
        bounding,
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
  }, [particlesByDimension, workers, behavior, bounding])

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
          <SpaceCell simulationIndex={i} spin={spin} />
          <TimeCell simulationIndex={i} spin={spin} />
        </group>
      ))}
    </>
  )
}

const xAxis = new Vector3(1, 0, 0)
const zAxis = new Vector3(0, 0, 1)
const rightAngle = Math.PI / 2

const SpaceCell: FC<{ simulationIndex: number; spin: number }> = ({
  simulationIndex,
  spin,
}) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    if (simulationIndex < 3) return
    groupRef.current?.rotateOnAxis(xAxis, spin)
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

const TimeCell: FC<{ simulationIndex: number; spin: number }> = ({
  simulationIndex,
  spin,
}) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    if (simulationIndex < 2) return
    groupRef.current?.rotateOnAxis(zAxis, spin)
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