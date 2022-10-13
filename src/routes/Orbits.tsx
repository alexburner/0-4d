import { Canvas, useFrame } from '@react-three/fiber'
import { releaseProxy, wrap } from 'comlink'
import { times } from 'lodash'
import { FC, useEffect, useMemo } from 'react'
import {
  makeFilledParticles,
  makeFreshParticles,
  Particle,
} from '../simulation/particles'
import { Simulation } from '../simulation/Simulation'
import SimulationWorker from '../simulation/SimulationWorker?worker'
import { HashRoute } from '../util/hashRoute'

const PARTICLE_COUNT = 12
const SIMULATION_RADIUS = 14
const DIMENSION_COUNT = 5

export const Orbits: FC<{ route: HashRoute }> = ({ route }) => (
  <Canvas>
    <OrbitsR3F route={route} />
  </Canvas>
)

const OrbitsR3F: FC<{ route: HashRoute }> = ({ route }) => {
  console.log(route)

  const particlesByDimension = useMemo(() => createParticlesByDimension(), [])
  const workers = useMemo(() => createWorkers(), [])

  // Worker init & release
  useEffect(() => {
    particlesByDimension.forEach((particles, i) => {
      const worker = workers[i]
      if (!worker) throw new Error('Unreachable')
      void worker.init(particles, {
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
    return () => {
      workers.forEach((worker) => worker[releaseProxy]())
    }
  }, [particlesByDimension, workers])

  useFrame(() => {
    workers.forEach((worker) => {
      // TODO push resulting simulation data into zustrand
      // so it can be transiently consumed by descendants
      void worker.tick().then((simulationData) => console.log(simulationData))
    })
  })

  return null
}

const createParticlesByDimension = () => {
  const particlesByDimension: Particle[][] = []
  for (let dimension = 0; dimension < DIMENSION_COUNT; dimension++) {
    // Prefill next dimension with previous values, if available
    const prevParticles = particlesByDimension[dimension - 1]
    const nextParticles = prevParticles
      ? makeFilledParticles(dimension, SIMULATION_RADIUS, prevParticles)
      : makeFreshParticles(dimension, SIMULATION_RADIUS, PARTICLE_COUNT)
    particlesByDimension.push(nextParticles)
  }
  return particlesByDimension
}

const createWorkers = () =>
  times(DIMENSION_COUNT, () => wrap<Simulation>(new SimulationWorker()))
