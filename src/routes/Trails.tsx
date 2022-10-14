import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber, times, upperFirst } from 'lodash'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { Dots } from '../components/Dots'
import { SquarePlane } from '../components/Plane'
import { SpaceTrails } from '../components/SpaceTrails'
import { TimeTrails } from '../components/TimeTrails'
import { Behavior } from '../simulation/behaviors'
import { Bounding } from '../simulation/boundings'
import { behaviors, isBehaviorName } from '../simulation/configs'
import { createWorkers } from '../simulation/createWorkers'
import { makeParticlesThroughDimensions } from '../simulation/particles'
import {
  createUseSimulationsStore,
  UseSimulationsStore,
} from '../stores/simulationStore'
import { HashRoute } from '../util/hashRoute'

const TOTAL_WIDTH = 1080
const TOTAL_HEIGHT = 1840
const TITLE_HEIGHT = 200
const CANVAS_WIDTH = TOTAL_WIDTH
const CANVAS_HEIGHT = (TOTAL_HEIGHT - TITLE_HEIGHT) / 2
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 7

const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPIN = 0.0125 / 2
const DEFAULT_BEHAVIOR_NAME = 'orbiting'

const useStore1 = createUseSimulationsStore()
const useStore2 = createUseSimulationsStore()

export const Trails: FC<{ route: HashRoute }> = ({ route }) => {
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

  return (
    <div
      style={{
        width: `${TOTAL_WIDTH}px`,
        height: `${TOTAL_HEIGHT}px`,
        background: '#333',
        margin: 'auto',
      }}
    >
      <div
        style={{
          width: `${TOTAL_WIDTH}px`,
          height: `${TITLE_HEIGHT}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Trails — {upperFirst(behaviorName)}</h1>
      </div>
      <div
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
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
          style={{ background: '#333' }}
        >
          <TrailsR3F
            particleCount={particleCount}
            spin={spin}
            behavior={behavior}
            bounding="centerScaling"
            useSimulationsStore={useStore1}
          />
        </Canvas>
      </div>
      <div
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
        }}
      >
        <Canvas
          camera={{
            fov: VIEWANGLE,
            aspect: CANVAS_WIDTH / CANVAS_HEIGHT,
            near: NEAR,
            far: FAR,
            position: [0, 0, 40 * ZOOM],
          }}
          style={{ background: '#333' }}
        >
          <TrailsR3F
            particleCount={particleCount}
            spin={spin}
            behavior={behavior}
            bounding="edgeBinding"
            useSimulationsStore={useStore2}
          />
        </Canvas>
      </div>
    </div>
  )
}

const TrailsR3F: FC<{
  particleCount: number
  spin: number
  behavior: Behavior
  bounding: Bounding
  useSimulationsStore: UseSimulationsStore
}> = ({ particleCount, spin, behavior, bounding, useSimulationsStore }) => {
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
        <group key={i} position={[0, 95 - i * (3.5 * 12), 0]}>
          <SpaceCell
            useSimulationsStore={useSimulationsStore}
            simulationIndex={i}
            spin={spin}
          />
          <TimeCell
            useSimulationsStore={useSimulationsStore}
            simulationIndex={i}
            spin={spin}
          />
        </group>
      ))}
    </>
  )
}

const xAxis = new Vector3(1, 0, 0)
const zAxis = new Vector3(0, 0, 1)
const rightAngle = Math.PI / 2

const SpaceCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  spin: number
}> = ({ useSimulationsStore, simulationIndex, spin }) => {
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

const TimeCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  spin: number
}> = ({ useSimulationsStore, simulationIndex, spin }) => {
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
