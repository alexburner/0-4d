import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy } from 'comlink'
import { isNumber } from 'lodash'
import { FC, Fragment, useEffect, useMemo, useRef } from 'react'
import { Group, Vector3 } from 'three'
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

const SUB_DIMENSIONS: number[] = [-1]
const SIM_DIMENSIONS = [0, 1, 2, 3, 4, 6, 12, 24]
const SUP_DIMENSIONS = [Infinity]
const DIMENSIONS = [...SUB_DIMENSIONS, ...SIM_DIMENSIONS, ...SUP_DIMENSIONS]
const DIMENSION_CHARS = ['x', 'y', 'z']
export const DIMENSION_LABELS: Partial<Record<string, string>> = {
  '-1': 'nothing',
  '0': 'existence',
  '1': 'energy',
  '2': 'matter',
  '3': 'life',
  '4': '           mind     →', // →
  Infinity: 'beyond',
}
const DIMENSION_FORMS: Partial<Record<string, string>> = {
  '0': 'being',
  '1': 'waves',
  '2': 'spirals',
  '3': 'tangles',
  '4': 'hidden\nvariables', // →
}
const DFC_S = '70%'
const DFC_L = '70%'
const DIMENSION_FORM_COLORS: Partial<Record<string, string>> = {
  // '1': `hsl(187deg ${DFC_S} ${DFC_L})`,
  // '2': `hsl(212deg ${DFC_S} ${DFC_L})`,
  // '3': `hsl(235deg ${DFC_S} ${DFC_L})`,
  // '4': `hsl(297deg ${DFC_S} ${DFC_L})`,
  '0': `hsl(184deg 0% ${DFC_L})`,
  '1': `hsl(194deg ${DFC_S} ${DFC_L})`,
  '2': `hsl(214deg ${DFC_S} ${DFC_L})`,
  '3': `hsl(232deg ${DFC_S} ${DFC_L})`,
  '4': `hsl(272deg ${DFC_S} ${DFC_L})`,
}

const SIMULATION_RADIUS = 14
const TRAIL_LENGTH = 720

const DEFAULT_PARTICLE_COUNT = 9
const DEFAULT_SPIN = -0.0061215
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
          left: '-85px',
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
            left: '53px',
            right: '53px',
            // border: '1px dashed #555',
          }}
        >
          {DIMENSIONS.map((dimension, dIndex) => {
            const dPrev = DIMENSIONS[dIndex - 1]
            const dDelta = dPrev === undefined ? -Infinity : dimension - dPrev
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
            const dText =
              dimension === -2
                ? ''
                : dimension === -1
                ? ''
                : dimension === Infinity
                ? '∞ d' // '100000d' '∞ d'
                : `${dimension}d`
            const nText = dText.split('d')[0]
            // const dLabel = DIMENSION_LABELS[String(dimension)]
            // const isEdge = !SIM_DIMENSIONS.includes(dimension)
            const dForm = DIMENSION_FORMS[String(dimension)]
            const dColor = DIMENSION_FORM_COLORS[String(dimension)]
            return (
              <div
                key={dimension}
                style={{
                  textAlign: 'center',
                  width: '110px',
                  // border: '1px dashed #555',
                  position: 'relative',
                }}
              >
                {dForm && (
                  <div
                    style={{
                      position: 'absolute',
                      // bottom: '980px',
                      top: '73px',
                      left: '-20px',
                      right: '-20px',
                      textAlign: 'center',
                      // border: '1px dotted #CCC',
                      color: dColor ?? '#AAA',
                      // fontFamily: 'Palantino',
                      // fontStyle: 'italic',
                      // textTransform: 'uppercase',
                      letterSpacing: '0.11em',
                      lineHeight: '1.33em',
                      fontSize: '11px',
                      fontWeight: 100,
                      whiteSpace: 'pre',
                    }}
                  >
                    {dForm}
                    {/* {dimension === 4 && (
                      <span
                        style={{
                          position: 'absolute',
                          // top: '1px',
                          // right: '30px',
                          top: '3px',
                          right: '22px',
                          color: `hsl(282deg ${DFC_S} ${DFC_L})`,
                        }}
                      >
                        →
                      </span>
                    )} */}
                  </div>
                )}
                {/* {dLabel && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-930px',
                      left: '-20px',
                      right: '-20px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        // border: '1px dotted #CCC',
                        // background: 'rgba(34, 34, 34, 0.25)',
                        color: isEdge ? '#888' : '#BBB',
                        // color: '#AAA',
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.67em',
                        fontWeight: 100,
                        fontStyle: isEdge ? 'italic' : undefined,
                        // opacity: isEdge ? 0.5 : 1,
                        // padding: '24px 0',
                        // backdropFilter: 'blur(3px)',
                      }}
                    >
                      {dLabel}
                    </div>
                  </div>
                )} */}
                <h3
                  style={{
                    fontWeight: '100',
                    fontSize: '16px',
                    position: 'relative',
                    // opacity: 0.7,
                  }}
                >
                  {nText ? (
                    <span style={{ color: '#DDD' }}>
                      {nText}
                      <span style={{ color: '#CCC' }}>d</span>
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                  {dDelta > 1 && (
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
                <h5
                  style={{
                    fontWeight: 'normal',
                    fontFamily: 'Georgia',
                    marginTop: '-0.67em',
                    // opacity: 0.9,
                  }}
                >
                  {localChars ? (
                    <span style={{ color: '#777' }}>
                      <span style={{ fontSize: '0.9em' }}>{'( '}</span>
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
                      <span style={{ fontSize: '0.9em' }}>{' )'}</span>
                    </span>
                  ) : (
                    <>&nbsp;</>
                  )}
                </h5>
                {/* <div
                  style={{
                    background: 'rgba(34, 34, 34, 0.25)',
                    color: isEdge ? '#AAA' : '#DDD',
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.67em',
                    fontWeight: 100,
                    fontStyle: isEdge ? 'italic' : undefined,
                  }}
                >
                  {dLabel}
                </div> */}
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
  }, [particlesByDimension, workers, behavior, bounding, calcSurface])

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
                  isInfinity
                />
                <TimeCell
                  useSimulationsStore={useSimulationsStore}
                  simulationIndex={0}
                  particleCount={particleCount}
                  bounding={bounding}
                  spin={spin}
                  isInfinity
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
  isInfinity?: boolean
}> = ({ useSimulationsStore, simulationIndex, spin, isInfinity }) => {
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
        isInfinity={isInfinity}
      />
      <RainbowSpaceTrails
        simulationIndex={simulationIndex}
        simulationRadius={SIMULATION_RADIUS}
        useSimulationsStore={useSimulationsStore}
        isInfinity={isInfinity}
      />
      <SpaceTrails
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        useSurface
        fillStyle="rgba(255, 255, 255, 0.18)"
      />
      {/* <Dots
        simulationIndex={simulationIndex}
        useSimulationsStore={useSimulationsStore}
        useSurface
      /> */}
      {/* <SpaceGrid radius={SIMULATION_RADIUS} /> */}
    </group>
  )
}

const TimeCell: FC<{
  useSimulationsStore: UseSimulationsStore
  simulationIndex: number
  particleCount: number
  bounding: Bounding
  spin: number
  isInfinity?: boolean
}> = ({
  useSimulationsStore,
  simulationIndex,
  particleCount,
  spin,
  isInfinity,
}) => {
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
        isInfinity={isInfinity}
      />
      <RainbowTimeTrails
        simulationIndex={simulationIndex}
        simulationRadius={SIMULATION_RADIUS}
        useSimulationsStore={useSimulationsStore}
        particleCount={particleCount}
        trailLength={TRAIL_LENGTH}
        isInfinity={isInfinity}
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
        fillStyle="rgba(255, 255, 255, 0.22)"
      />

      {/* <SpaceGrid radius={SIMULATION_RADIUS} time /> */}
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
      {/* <SpaceGrid radius={SIMULATION_RADIUS} /> */}
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
      {/* <SpaceGrid radius={SIMULATION_RADIUS} time /> */}
    </group>
  )
}
