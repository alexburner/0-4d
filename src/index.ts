import { wrap } from 'comlink'
import { isNumber, times } from 'lodash'
import { behaviors, isBehaviorName, isBounding } from './config'
import './index.css'
import { Renderer } from './render/Renderer'
import { Row } from './render/row/Row'
import { TrailingSpaceView } from './render/views/trailing/TrailingSpaceView'
import { TrailingTimeView } from './render/views/trailing/TrailingTimeView'
import {
  makeFilledParticles,
  makeFreshParticles,
  Particle,
} from './simulation/Particle'
import { Simulation } from './simulation/Simulation'
import SimulationWorker from './simulation/SimulationWorker?worker'
import { getHashParams } from './util/getHashParams'

/**
 * Initial parameters
 */

const lol = 1440 / 1980

// Constants
const WIDTH = 1920 * lol
const HEIGHT = 1080 * lol
const RADIUS = 14
const DEFAULT_COUNT = 9
const DEFAULT_SPIN = 0.0125
const DEFAULT_DIMENSIONS = 4
const DEFAULT_BEHAVIOR_NAME = 'orbiting'
const DEFAULT_BOUNDING = 'centerScaling'

// Url params
const params = getHashParams()
const spin = isNumber(params['spin']) ? params['spin'] : DEFAULT_SPIN
const count = isNumber(params['count']) ? params['count'] : DEFAULT_COUNT
const dimensions = isNumber(params['d']) ? params['d'] : DEFAULT_DIMENSIONS
const behaviorParam = params['behavior']
const boundingParam = params['bounding']

// Derived
const dimensionCount = dimensions + 1 // for zero
const bounding = isBounding(boundingParam) ? boundingParam : DEFAULT_BOUNDING
const behaviorName = isBehaviorName(behaviorParam)
  ? behaviorParam
  : DEFAULT_BEHAVIOR_NAME
const behavior = behaviors[behaviorName]

/**
 * Three.js Renderer
 */

// Create & append canvas
const canvas = document.createElement('canvas')
canvas.style.display = 'block'
canvas.style.margin = 'auto'
document.body.appendChild(canvas)

// Create renderer
const renderer = new Renderer(WIDTH, HEIGHT, canvas)

/**
 * Initial particle data
 */

const particlesByDimension: Particle[][] = []
for (let dimension = 0; dimension < dimensionCount; dimension++) {
  // Prefill next dimension with previous values, if available
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
  void simulationWorker.init(particles, {
    behavior,
    bounding,
    radius: RADIUS,
  })
  return simulationWorker
})

/**
 * Visualization rows
 */

const rows = times(dimensionCount, (i) => {
  const row = new Row({
    dimensions: i,
    radius: RADIUS,
    x: 0,
    y: 85 - i * (3.5 * 12),
    z: 0,
    spaceView: new TrailingSpaceView(),
    timeView: new TrailingTimeView(),
  })
  renderer.scene.add(row.group)
  return row
})

/**
 * Animation loop
 */

const animate = async () => {
  requestAnimationFrame(() => void animate())
  // Render scene
  renderer.render()

  // Tick simulation workers and collect new data
  const responses = await Promise.all(simulationWorkers.map((w) => w.tick()))

  // Update rows with new data, and spin
  rows.forEach((row, i) => {
    const newData = responses[i]
    if (!newData) throw new Error('Unreachable')
    row.update(newData)
    row.rotate(spin)
  })
}

// Begin
void animate()
