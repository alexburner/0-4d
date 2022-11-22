import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber, times } from 'lodash'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Vector3 } from 'three'
import { Dots } from '../components/Dots'
import { SquarePlane } from '../components/Plane'
import { RainbowDots } from '../components/RainbowDots'
import { RainbowSpaceTrails } from '../components/RainbowSpaceTrails'
import { SpaceTrails } from '../components/SpaceTrails'
import { Behavior } from '../simulation/behaviors'
import { Bounding } from '../simulation/boundings'
import { behaviors, isBehaviorName } from '../simulation/configs'
import { createWorkers } from '../simulation/createWorkers'
import { makeParticlesThroughDimensions } from '../simulation/particles'
import { VectorN } from '../simulation/vectorN'
import {
  createUseSimulationsStore,
  UseSimulationsStore,
} from '../stores/simulationStore'
import { HashRoute } from '../util/hashRoute'

const WIDTH = 1840
const HEIGHT = 1080
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 9

const BACKGROUND_COLOR = '#222'

const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 9

const DEFAULT_PARTICLE_COUNT = 9
const DEFAULT_SPIN = 0.01215
const DEFAULT_BEHAVIOR_NAME = 'orbiting'

const BELOW_ZERO = 2

const useStores = [
  createUseSimulationsStore(),
  createUseSimulationsStore(),
] as const

export const TrailsCombinedIntro: FC<{ route: HashRoute }> = ({ route }) => {
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
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        background: BACKGROUND_COLOR,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          position: 'relative',
          top: '-150px',
        }}
      >
        <Canvas
          resize={{ scroll: false }}
          camera={{
            fov: VIEWANGLE,
            aspect: WIDTH / HEIGHT,
            near: NEAR,
            far: FAR,
            position: [0, 0, 40 * ZOOM],
          }}
          style={{ background: BACKGROUND_COLOR }}
        >
          {boundings.map((bounding, i) => {
            const useStore = useStores[i]
            if (!useStore) throw new Error('Unreachable')
            return (
              <TrailsR3F
                key={bounding}
                particleCount={particleCount}
                spin={spin}
                behavior={behavior}
                bounding={bounding}
                useSimulationsStore={useStore}
              />
            )
          })}
        </Canvas>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexGrow: 1,
            position: 'absolute',
            bottom: '-60px',
            left: '100px',
            right: '100px',
          }}
        >
          {new Array(DIMENSION_COUNT).fill(null).map((_, i) => {
            const dimension = i - BELOW_ZERO
            return (
              <div key={dimension} style={{ textAlign: 'center' }}>
                <h3 style={{ fontWeight: 'normal' }}>
                  {dimension === -2
                    ? ''
                    : dimension === -1
                    ? '__'
                    : `${dimension}d`}
                </h3>
              </div>
            )
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'start',
            flexGrow: 1,
            position: 'absolute',
            bottom: '300px',
            right: '50px',
          }}
        >
          <ValueLabels />
        </div>
      </div>
    </div>
  )
}

const VALUE_LABELS = ['x', 'y', 'z', 'w', 'v', 'u']

const ValueLabels: FC = () => {
  const [positions, setPositions] = useState<VectorN[]>([])

  useEffect(() => {
    useStores[1].subscribe((state) => {
      const nextPositions = state.simulations?.map((simulation) => {
        const particle = simulation.particles[0]
        if (!particle) throw new Error('Unreachable')
        return particle.position
      })
      if (!nextPositions) throw new Error('Unreachable')
      setPositions(nextPositions)
    })
  }, [])

  return (
    <>
      {new Array(DIMENSION_COUNT).fill(null).map((_, i) => {
        const dimension = i - BELOW_ZERO
        const position = dimension > 0 ? positions[dimension] : undefined
        return (
          <div
            key={dimension}
            style={{ width: '172px', textAlign: 'left', overflow: 'hidden' }}
          >
            <h3 style={{ fontWeight: 'normal' }}>
              {position?.map((value, j) => (
                <div key={j}>
                  {VALUE_LABELS[j]} = {value.toFixed(3)}
                </div>
              ))}
            </h3>
          </div>
        )
      })}
    </>
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
      {times(DIMENSION_COUNT, (i) => {
        const simulationIndex = i - BELOW_ZERO
        return (
          <group key={i} position={[-200 + i * 50, -120, 0]}>
            {simulationIndex === -2 ? (
              <></>
            ) : simulationIndex === -1 ? (
              <EmptySpaceCell spin={spin} />
            ) : (
              <SpaceCell
                useSimulationsStore={useSimulationsStore}
                simulationIndex={simulationIndex}
                bounding={bounding}
                spin={spin}
              />
            )}
          </group>
        )
      })}
    </>
  )
}

const xAxis = new Vector3(1, 0, 0)
// const yAxis = new Vector3(0, 1, 0)
const zAxis = new Vector3(0, 0, 1)
const rightAngle = Math.PI / 2

const SpaceCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  bounding: Bounding
  spin: number
}> = ({ useSimulationsStore, simulationIndex, bounding, spin }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group ref={groupRef}>
      {bounding === 'centerScaling' ? (
        <>
          <RainbowDots
            simulationIndex={simulationIndex}
            simulationRadius={SIMULATION_RADIUS}
            useSimulationsStore={useSimulationsStore}
          />
          <RainbowSpaceTrails
            simulationIndex={simulationIndex}
            simulationRadius={SIMULATION_RADIUS}
            useSimulationsStore={useSimulationsStore}
          />
        </>
      ) : (
        <>
          <Dots
            simulationIndex={simulationIndex}
            useSimulationsStore={useSimulationsStore}
          />
          <SpaceTrails
            simulationIndex={simulationIndex}
            useSimulationsStore={useSimulationsStore}
          />
        </>
      )}
      <SquarePlane radius={SIMULATION_RADIUS} />
    </group>
  )
}

const EmptySpaceCell: FC<{ spin: number }> = ({ spin }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group ref={groupRef}>
      <SquarePlane radius={SIMULATION_RADIUS} />
    </group>
  )
}
