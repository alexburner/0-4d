import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy, wrap } from 'comlink'
import { times } from 'lodash'
import { FC, useEffect, useMemo, useRef } from 'react'
import create from 'zustand'
import {
  makeFilledParticles,
  makeFreshParticles,
  Particle,
} from '../../simulation/particles'
import { Simulation, SimulationData } from '../../simulation/Simulation'
import SimulationWorker from '../../simulation/SimulationWorker?worker'
import { HashRoute } from '../../util/hashRoute'
import { Dots } from './Dots'

const WIDTH = 1080
const HEIGHT = 920
const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 7

const PARTICLE_COUNT = 12
const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

interface SimulationStore {
  simulations: SimulationData[] | undefined
  updateSimulations: (next: SimulationData[]) => void
}

export const useSimulationsStore = create<SimulationStore>((set) => ({
  simulations: undefined,
  updateSimulations: (next) => set({ simulations: next }),
}))

export const Orbits: FC<{ route: HashRoute }> = ({ route }) => (
  <div style={{ width: `${WIDTH}px`, height: `${HEIGHT}px`, margin: 'auto' }}>
    <Canvas
      camera={{
        fov: VIEWANGLE,
        aspect: WIDTH / HEIGHT,
        near: NEAR,
        far: FAR,
        position: [50, 0, 40 * ZOOM],
      }}
    >
      <OrbitsR3F route={route} />
    </Canvas>
  </div>
)

const OrbitsR3F: FC<{ route: HashRoute }> = ({ route }) => {
  console.log(route)

  /**
   * Initialize simulation particles
   */

  const particlesByDimension = useMemo(
    () => createParticlesByDimension(DIMENSION_COUNT),
    [],
  )

  /**
   * Setup simulation workers
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
   * Tick simulation workers & update store data each frame
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

  return <Dots simulationIndex={3} />
}

const createParticlesByDimension = (dimensionCount: number) => {
  const particlesByDimension: Particle[][] = []
  for (let dimension = 0; dimension < dimensionCount; dimension++) {
    // Prefill next dimension with previous values, if available
    const prevParticles = particlesByDimension[dimension - 1]
    const nextParticles = prevParticles
      ? makeFilledParticles(dimension, SIMULATION_RADIUS, prevParticles)
      : makeFreshParticles(dimension, SIMULATION_RADIUS, PARTICLE_COUNT)
    particlesByDimension.push(nextParticles)
  }
  return particlesByDimension
}

const createWorkers = (dimensionCount: number) =>
  times(dimensionCount, () => wrap<Simulation>(new SimulationWorker()))
