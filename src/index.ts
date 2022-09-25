import { wrap } from 'comlink'
import { isNumber, throttle, times } from 'lodash'
import './index.css'
import {
  makeFilledParticles,
  makeFreshParticles,
  Particle,
} from './simulation/Particle'
import { Simulation } from './simulation/Simulation'
import SimulationWorker from './simulation/SimulationWorker?worker'
import { getHashParams } from './util/getHashParams'
import { Renderer } from './view/Renderer'
import { Row } from './view/Row'

/**
 * Initial parameters
 */

const DIMENSIONS = 3
const RADIUS = 14
const DEFAULT_COUNT = 9
const DEFAULT_SPIN = 0.007

const params = getHashParams()
const spin = isNumber(params['spin']) ? params['spin'] : DEFAULT_SPIN
const count = isNumber(params['count']) ? params['count'] : DEFAULT_COUNT

/**
 * Three.js Renderer
 */

const renderer = new Renderer(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.canvas)
window.addEventListener(
  'resize',
  throttle(() => renderer.resize(window.innerWidth, window.innerHeight), 100, {
    trailing: true,
  }),
)

/**
 * Initial particle data
 */

const particlesByDimension: Particle[][] = []
for (let dimension = 0; dimension < DIMENSIONS + 1; dimension++) {
  const prevParticles = particlesByDimension[dimension - 1]
  const nextParticles = prevParticles
    ? makeFilledParticles(dimension, RADIUS, prevParticles)
    : makeFreshParticles(dimension, RADIUS, count)
  particlesByDimension.push(nextParticles)
}

/**
 * Simulation workers
 */

const simulationWorkers = particlesByDimension.map((particles) => {
  const simulationWorker = wrap<Simulation>(new SimulationWorker())
  void simulationWorker.init(particles, { radius: RADIUS })
  return simulationWorker
})

/**
 * Visualization rows
 */

const rows = times(DIMENSIONS + 1, (i) => {
  const row = new Row({
    dimensions: i,
    radius: RADIUS,
    x: 0,
    y: 80 - i * (3.5 * 12),
    z: 0,
  })
  renderer.scene.add(row.getObject())
  return row
})

/**
 * Animation loop
 */

const animate = async () => {
  requestAnimationFrame(() => void animate())
  // Tick simulation workers and collect new data
  const responses = await Promise.all(simulationWorkers.map((w) => w.tick()))
  // Update rows with new data, and spin
  rows.forEach((row, i) => {
    const newData = responses[i]
    if (!newData) throw new Error('Unreachable')
    row.update(newData)
    row.rotate(spin)
  })
  // Render changes
  renderer.render()
}

// Begin
void animate()
