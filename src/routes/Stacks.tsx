import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber, times } from 'lodash'
import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { Dots } from '../components/Dots'
import { SpaceGrid } from '../components/Plane'
import { SpaceLines } from '../components/SpaceLines'
import { TimeLines } from '../components/TimeLines'
import { Behavior } from '../simulation/behaviors'
import { Bounding } from '../simulation/boundings'
import { behaviors, isBehaviorName } from '../simulation/configs'
import { createWorkers } from '../simulation/createWorkers'
import {
  makeFreshParticle,
  makeParticlesThroughDimensions,
} from '../simulation/particles'
import {
  createUseSimulationsStore,
  UseSimulationsStore,
} from '../stores/simulationStore'
import { HashRoute } from '../util/hashRoute'

const TOTAL_WIDTH = 1840
const TOTAL_HEIGHT = 1080
const CANVAS_MARGIN = 0
const CANVAS_WIDTH = TOTAL_WIDTH
const CANVAS_HEIGHT = TOTAL_HEIGHT
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 9

const BACKGROUND_COLOR = '#222'

const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

const INIT_PARTICLE_COUNT = 0
const MAX_PARTICLE_COUNT = 16

const DEFAULT_SPIN = 0.0125 / 2
const DEFAULT_BEHAVIOR_NAME = 'orbiting'

const boundings = ['edgeBinding'] as const
const useStores = [createUseSimulationsStore()] as const

export const Stacks: FC<{ route: HashRoute }> = ({ route }) => {
  const initParticleCount = isNumber(route.params['particles'])
    ? route.params['particles']
    : INIT_PARTICLE_COUNT
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
          justifyContent: 'space-evenly',
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
                <StacksR3F
                  initParticleCount={initParticleCount}
                  spin={spin}
                  behavior={behavior}
                  bounding={bounding}
                  useSimulationsStore={useStore}
                />
              </Canvas>
            </div>
          )
        })}
      </div>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        {boundings.map((bounding) => (
          <div key={bounding} style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0 }}>{behaviorName} trails</h2>
            <p>( {lowerCase(bounding)} )</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

const StacksR3F: FC<{
  initParticleCount: number
  spin: number
  behavior: Behavior
  bounding: Bounding
  useSimulationsStore: UseSimulationsStore
}> = ({ initParticleCount, spin, behavior, bounding, useSimulationsStore }) => {
  /**
   * Create simulation particles
   */

  const particlesByDimension = useMemo(
    () =>
      makeParticlesThroughDimensions(
        DIMENSION_COUNT,
        initParticleCount,
        SIMULATION_RADIUS,
      ),
    [initParticleCount],
  )

  /**
   * Create simulation workers
   */

  const simulationConfig = useMemo(
    () => ({
      behavior,
      bounding,
      radius: SIMULATION_RADIUS,
      maxSpeed: 1,
    }),
    [behavior, bounding],
  )
  const workers = useMemo(() => createWorkers(DIMENSION_COUNT), [])
  const workersReadyRef = useRef(false)
  useEffect(() => {
    // Init workers on mount
    const initPromises = workers.map((worker, i) => {
      const particles = particlesByDimension[i]
      if (!particles) throw new Error('Unreachable')
      return worker.init(particles, simulationConfig)
    })

    // Mark workers as ready to tick, after init
    void Promise.all(initPromises).then(() => (workersReadyRef.current = true))

    return () => {
      // Release workers on dismount
      workers.forEach((worker) => worker[releaseProxy]())
    }
  }, [particlesByDimension, workers, behavior, bounding, simulationConfig])

  /**
   * Every 1 second, add a particle & tick simulations 1000 times
   */

  const isAddingRef = useRef(true)
  const updateSimulations = useSimulationsStore(
    (state) => state.updateSimulations,
  )
  const tickWorkers = useCallback(async () => {
    // Decide whether to add or remove
    {
      const sampleParticles = particlesByDimension[0]
      if (!sampleParticles) throw new Error('Unreachable')
      if (
        isAddingRef.current &&
        sampleParticles.length === MAX_PARTICLE_COUNT
      ) {
        // We're adding, but we're at max, start removing
        isAddingRef.current = false
      } else if (!isAddingRef.current && sampleParticles.length === 0) {
        // We're removing, but we're at zero, start adding
        isAddingRef.current = true
      }
    }
    // Add or remove a new particle to each dimension simulation
    particlesByDimension.forEach((particles, i) => {
      isAddingRef.current
        ? particles.push(makeFreshParticle(i, SIMULATION_RADIUS))
        : particles.pop()
    })
    // Re-init workers with new particles
    await Promise.all(
      workers.map((worker, i) => {
        const particles = particlesByDimension[i]
        if (!particles) throw new Error('Unreachable')
        return worker.init(particles, simulationConfig)
      }),
    )
    // Batch tick workers
    const updates = await Promise.all(
      workers.map((worker) => worker.tick(1000)),
    )
    // Update store
    updateSimulations(updates)
  }, [updateSimulations, workers, particlesByDimension, simulationConfig])
  useEffect(() => {
    const interval = setInterval(
      () => workersReadyRef.current && void tickWorkers(),
      1000,
    )
    return () => clearInterval(interval)
  }, [tickWorkers])

  /**
   * Render scene
   */

  return (
    <group position={[-100, 0, 0]}>
      {times(DIMENSION_COUNT, (i) => (
        <group key={i} position={[0, 85 - i * (3.5 * 12), 0]}>
          <SpaceCell
            useSimulationsStore={useSimulationsStore}
            simulationIndex={i}
            spin={spin}
          />
          <TimeCell
            useSimulationsStore={useSimulationsStore}
            simulationIndex={i}
            // spin={spin}
            spin={0}
          />
        </group>
      ))}
    </group>
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
  }, [])
  useFrame(() => {
    // Spin rotation
    // if (simulationIndex < 3) return
    groupRef.current?.rotateOnAxis(xAxis, spin)
  })
  return (
    <group ref={groupRef} position={[leftStart - 40, 0, 0]}>
      <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SpaceLines
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
    // if (simulationIndex < 2) return
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group ref={groupRef} position={[leftStart, 0, 0]} rotation={[0, 0.75, 0]}>
      {/* <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      /> */}
      <TimeLines
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
      />
      <SpaceGrid radius={SIMULATION_RADIUS} />
    </group>
  )
}
