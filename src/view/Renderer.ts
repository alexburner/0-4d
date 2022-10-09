import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const VIEWANGLE = 45
const NEAR = 1
const FAR = 5000
const ZOOM = 7

export class Renderer {
  readonly scene: Scene
  readonly canvas: HTMLCanvasElement

  private readonly renderer: THREE.WebGLRenderer
  private readonly camera: THREE.PerspectiveCamera

  constructor(width: number, height: number, canvas?: HTMLCanvasElement) {
    // Set up renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas,
    })
    this.renderer.setSize(width, height)

    // Grab canvas ref for external consumers
    this.canvas = this.renderer.domElement

    // Set up scene
    this.scene = new Scene()

    // Set up camera
    this.camera = new PerspectiveCamera(VIEWANGLE, width / height, NEAR, FAR)
    this.camera.position.z = 40 * ZOOM
    this.camera.position.x = 50
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }
}
