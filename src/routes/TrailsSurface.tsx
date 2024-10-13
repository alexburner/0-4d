import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber } from 'lodash'
import { FC, Fragment, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
import { SpaceGrid } from '../components/Plane'
import { RainbowDots } from '../components/RainbowDots'
import { RainbowSpaceTrails } from '../components/RainbowSpaceTrails'
import { RainbowTimeTrails } from '../components/RainbowTimeTrails'
import { SpaceTrails } from '../components/SpaceTrails'
import { TimeTrails } from '../components/TimeTrails'
import { Behavior } from '../simulation/behaviors'
import { Bounding } from '../simulation/boundings'
import { behaviors, isBehaviorName, isBounding } from '../simulation/configs'
import { createWorkers } from '../simulation/createWorkers'
import { makeParticlesThroughDimensions2 } from '../simulation/particles'
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
const ZOOM = 9.4

const BACKGROUND_COLOR = '#222'

const SIMULATION_RADIUS = 14

const SUB_DIMENSIONS: number[] = [-1]
const SIM_DIMENSIONS = [0, 1, 2, 3, 4, 5, 10, 33]
const SUP_DIMENSIONS = [Infinity]
const DIMENSIONS = [...SUB_DIMENSIONS, ...SIM_DIMENSIONS, ...SUP_DIMENSIONS]
const DIMENSION_CHARS = ['x', 'y', 'z']
const TRAIL_LENGTH = 720

const DEFAULT_PARTICLE_COUNT = 9
const DEFAULT_SPIN = -0.00351215
const DEFAULT_BEHAVIOR_NAME = 'orbiting'

const useStore = createUseSimulationsStore()

const behaviorBoundings: Record<Behavior['name'], Bounding> = {
  orbiting: 'centerScaling',
  wandering: 'centerScaling',
  rays: 'edgeReflecting',
  diffusion: 'centerScaling',
}

export const TrailsSurface: FC<{ route: HashRoute }> = ({ route }) => {
  const particleCount = isNumber(route.params['particles'])
    ? route.params['particles']
    : DEFAULT_PARTICLE_COUNT
  const spin = isNumber(route.params['spin'])
    ? route.params['spin']
    : DEFAULT_SPIN
  const behaviorName = isBehaviorName(route.params['behavior'])
    ? route.params['behavior']
    : DEFAULT_BEHAVIOR_NAME
  const bounding = isBounding(route.params['bounding'])
    ? route.params['bounding']
    : behaviorBoundings[behaviorName]
  const calcSurface = !route.params['noSurface']
  const behavior = behaviors[behaviorName]
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
          top: '-100px',
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
          <TrailsR3F
            key={bounding}
            particleCount={particleCount}
            spin={spin}
            behavior={behavior}
            bounding={bounding}
            useSimulationsStore={useStore}
            calcSurface={calcSurface}
          />
        </Canvas>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexGrow: 1,
            position: 'absolute',
            bottom: '-57px',
            left: '48px',
            right: '48px',
            // border: '1px dashed #555',
          }}
        >
          {DIMENSIONS.map((dimension) => {
            let localChars: string[] | undefined = undefined
            if (dimension >= 0) {
              localChars = DIMENSION_CHARS.slice(
                0,
                Math.min(dimension, DIMENSION_CHARS.length),
              )
            }
            if (localChars && dimension > DIMENSION_CHARS.length) {
              localChars.push('...')
            }

            return (
              <div
                key={dimension}
                style={{
                  textAlign: 'center',
                  width: '110px',
                  // border: '1px dashed #555',
                }}
              >
                <h3
                  style={{
                    fontWeight: 'normal',
                    position: 'relative',
                    opacity: 0.88,
                  }}
                >
                  {dimension === -2
                    ? ''
                    : dimension === -1
                    ? ''
                    : dimension === Infinity
                    ? '∞ d' // '100000d' '∞ d'
                    : `${dimension}d`}
                  {dimension > 5 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '-38%',
                        top: '2px',
                        opacity: 0.25,
                        fontSize: '1rem',
                      }}
                    >
                      {'...'}
                    </div>
                  )}
                </h3>
                {
                  <h5
                    style={{
                      fontWeight: 'normal',
                      fontFamily: 'Georgia',
                      marginTop: '-0.9em',
                      opacity: 0.9,
                    }}
                  >
                    {localChars ? (
                      <span style={{ color: '#555' }}>
                        {'( '}
                        <span style={{ padding: '0 2px' }}>
                          {localChars.map((char, i, l) => {
                            const isLast = i === l.length - 1
                            return (
                              <Fragment key={char}>
                                <span style={{ color: '#BBB' }}>{char}</span>
                                {!isLast && (
                                  <span style={{ color: '#777' }}>, </span>
                                )}
                              </Fragment>
                            )
                          })}
                        </span>
                        {' )'}
                      </span>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </h5>
                }
              </div>
            )
          })}
        </div>
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
  calcSurface: boolean
}> = ({
  particleCount,
  spin,
  behavior,
  bounding,
  useSimulationsStore,
  calcSurface,
}) => {
  /**
   * Create simulation particles
   */

  const particlesByDimension = useMemo(
    () =>
      makeParticlesThroughDimensions2(
        SIM_DIMENSIONS,
        particleCount,
        SIMULATION_RADIUS,
      ),
    [particleCount],
  )

  /**
   * Create simulation workers
   */

  const workers = useMemo(() => createWorkers(SIM_DIMENSIONS.length), [])
  const workersReadyRef = useRef(false)
  useEffect(() => {
    // Init workers on mount
    const initPromises = workers.map((worker, i) => {
      const dimension = SIM_DIMENSIONS[i]
      if (dimension === undefined) throw new Error('dimension === undefined')
      const particles = particlesByDimension[dimension]
      if (!particles) throw new Error('!particles')
      return worker.init(particles, {
        behavior,
        bounding,
        radius: SIMULATION_RADIUS,
        maxSpeed: 0.99,
        calcSurface,
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
      {DIMENSIONS.map((dimension, i) => {
        const simulationIndex = i - SUB_DIMENSIONS.length
        return (
          <group key={i} position={[-225 + i * 50, -124, 0]}>
            {dimension === -2 ? (
              <></>
            ) : dimension === -1 ? (
              <>
                <EmptySpaceCell spin={spin} />
                <EmptyTimeCell spin={spin} />
              </>
            ) : dimension === Infinity ? (
              <>
                <SpaceCell
                  useSimulationsStore={useSimulationsStore}
                  simulationIndex={0}
                  bounding={bounding}
                  spin={spin}
                />
                <TimeCell
                  useSimulationsStore={useSimulationsStore}
                  simulationIndex={0}
                  particleCount={particleCount}
                  bounding={bounding}
                  spin={spin}
                />
              </>
            ) : (
              <>
                <SpaceCell
                  useSimulationsStore={useSimulationsStore}
                  simulationIndex={simulationIndex}
                  bounding={bounding}
                  spin={spin}
                />
                <TimeCell
                  useSimulationsStore={useSimulationsStore}
                  simulationIndex={simulationIndex}
                  particleCount={particleCount}
                  bounding={bounding}
                  spin={spin}
                />
              </>
            )}
          </group>
        )
      })}
    </>
  )
}

const xAxis = new Vector3(1, 0, 0)
const yAxis = new Vector3(0, 1, 0)
const zAxis = new Vector3(0, 0, 1)
const rightAngle = Math.PI / 2

const SpaceCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  bounding: Bounding
  spin: number
}> = ({ useSimulationsStore, simulationIndex, spin }) => {
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
      <SpaceTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        useSurface
        fillStyle="rgba(255, 255, 255, 0.4)"
      />
      {/* <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        useSurface
      /> */}
      <SpaceGrid radius={SIMULATION_RADIUS} />
    </group>
  )
}

const TimeCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  particleCount: number
  bounding: Bounding
  spin: number
}> = ({ useSimulationsStore, simulationIndex, particleCount, spin }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
    groupRef.current?.rotateOnAxis(yAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group ref={groupRef} position={[0, 40, 0]}>
      <RainbowDots
        simulationIndex={simulationIndex}
        simulationRadius={SIMULATION_RADIUS}
        useSimulationsStore={useSimulationsStore}
      />
      <RainbowTimeTrails
        simulationIndex={simulationIndex}
        simulationRadius={SIMULATION_RADIUS}
        useSimulationsStore={useSimulationsStore}
        particleCount={particleCount}
        trailLength={TRAIL_LENGTH}
      />
      {/* <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        useSurface
      /> */}
      <TimeTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        particleCount={particleCount}
        trailLength={TRAIL_LENGTH}
        useSurface
        fillStyle="rgba(255, 255, 255, 0.6)"
      />

      <SpaceGrid radius={SIMULATION_RADIUS} time />
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
      <SpaceGrid radius={SIMULATION_RADIUS} />
    </group>
  )
}

const EmptyTimeCell: FC<{ spin: number }> = ({ spin }) => {
  const groupRef = useRef<Group>(null)
  useEffect(() => {
    // Initial rotation
    groupRef.current?.rotateOnAxis(zAxis, -rightAngle)
    groupRef.current?.rotateOnAxis(xAxis, rightAngle)
    groupRef.current?.rotateOnAxis(yAxis, rightAngle)
  }, [])
  useFrame(() => {
    // Spin rotation
    groupRef.current?.rotateOnAxis(zAxis, spin)
  })
  return (
    <group ref={groupRef} position={[0, 40, 0]}>
      <SpaceGrid radius={SIMULATION_RADIUS} time />
    </group>
  )
}
