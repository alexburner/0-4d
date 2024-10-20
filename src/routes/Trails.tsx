import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber, lowerCase, times } from 'lodash'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { Dots } from '../components/Dots'
import { SpaceGrid } from '../components/Plane'
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

const TOTAL_WIDTH = 1840
const TOTAL_HEIGHT = 1080
const CANVAS_MARGIN = 40
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 6.5

const BACKGROUND_COLOR = '#222'

const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPIN = 0.00215
const DEFAULT_BEHAVIOR_NAME = 'orbiting'

const useStores = [
  createUseSimulationsStore(),
  createUseSimulationsStore(),
] as const

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

  const boundings: Bounding[] = ['edgeBinding', 'centerScaling']

  return (
    <div
      style={{
        width: `${TOTAL_WIDTH}px`,
        height: `${TOTAL_HEIGHT}px`,
        padding: `${CANVAS_MARGIN * 1.5}px 0 ${CANVAS_MARGIN * 0.5}px`,
        background: BACKGROUND_COLOR,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: `${CANVAS_MARGIN / 2}px`,
          height: `${CANVAS_HEIGHT}px`,
        }}
      >
        {boundings.map((bounding, i) => {
          const useStore = useStores[i]
          if (!useStore) throw new Error('Unreachable')
          return (
            <div
              key={bounding}
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
                style={{ background: BACKGROUND_COLOR }}
              >
                {/* <group rotation={i > 0 ? [0, rightAngle * 2, 0] : [0, 0, 0]}> */}
                <TrailsR3F
                  particleCount={particleCount}
                  // spin={i > 0 ? -spin : spin}
                  spin={spin}
                  behavior={behavior}
                  bounding={bounding}
                  useSimulationsStore={useStore}
                />
                {/* </group> */}
              </Canvas>
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        {boundings.map((bounding) => (
          <div key={bounding} style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5em' }}>{behaviorName} trails</h3>
            <i>( {lowerCase(bounding)} )</i>
          </div>
        ))}
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
        <group key={i} position={[0, 84 - i * (3.5 * 12), 0]}>
          <SpaceCell
            useSimulationsStore={useSimulationsStore}
            simulationIndex={i}
            spin={spin}
          />
          <TimeCell
            useSimulationsStore={useSimulationsStore}
            simulationIndex={i}
            particleCount={particleCount}
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
const leftStart = -50

const SpaceCell: FC<{
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
  // useFrame(() => {
  //   // Spin rotation
  //   // if (simulationIndex < 3) return
  //   groupRef.current?.rotateOnAxis(xAxis, spin)
  // })
  useFrame(() => {
    // Spin rotation
    // if (simulationIndex < 2) return
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group
      ref={groupRef}
      position={[leftStart - 40 + 10, 0, 5]}
      // rotation={[0, -0.25, 0]}
      rotation={[0, -0.25, 0]}
    >
      <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SpaceTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SpaceGrid radius={SIMULATION_RADIUS} />
    </group>
  )
}

const TimeCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  particleCount: number
  spin: number
}> = ({ useSimulationsStore, simulationIndex, particleCount, spin }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    // if (simulationIndex < 2) return
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group
      ref={groupRef}
      position={[leftStart + 5, 0, 0]}
      // rotation={[0.125, 0.75, 0]}
      rotation={[0, -0.25, 0]}
    >
      <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <TimeTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        particleCount={particleCount}
      />
      <SpaceGrid radius={SIMULATION_RADIUS} />
    </group>
  )
}
