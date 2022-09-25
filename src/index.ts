import { wrap } from 'comlink'
import { isNumber, throttle } from 'lodash'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
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

/**
 * Initial parameters
 */

const DIMENSIONS = 4
const RADIUS = 14
const DEFAULT_COUNT = 3
const DEFAULT_SPIN = -0.004

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
 * Initial particles
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

// TEMP TEST
const intervalId = setInterval(async () => {
  await Promise.all(simulationWorkers.map((sw) => sw.tick()))
  const data = await Promise.all(simulationWorkers.map((sw) => sw.getData()))
  console.log(data)
}, 1000)
window.addEventListener('blur', () => clearInterval(intervalId))

/**
 * Testing three.js
 */

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0x00ff00 })
const cube = new Mesh(geometry, material)

renderer.scene.add(cube)

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render()
}

animate()
