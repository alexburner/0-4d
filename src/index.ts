import { wrap } from 'comlink'
import { throttle } from 'lodash'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import './index.css'
import { Renderer } from './view/Renderer'
import { SimulationWorker } from './worker/SimulationWorker'
import SimulationWorkerProxy from './worker/SimulationWorkerProxy?worker'

const renderer = new Renderer(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.canvas)

window.addEventListener(
  'resize',
  throttle(() => renderer.resize(window.innerWidth, window.innerHeight), 100, {
    trailing: true,
  }),
)

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

// Testing workers
const workerProxy = wrap<SimulationWorker>(new SimulationWorkerProxy())

const test = async () => {
  const countBefore = await workerProxy.count
  console.log('countBefore', countBefore)
  await workerProxy.increment()
  const countAfter = await workerProxy.count
  console.log('countAfter', countAfter)
}

void test()
