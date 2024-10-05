import { Behavior } from './behaviors'
import { Bounding } from './boundings'

export const behaviors: Record<Behavior['name'], Behavior> = {
  orbiting: {
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
  wandering: {
    name: 'wandering',
    config: {
      jitter: 0.2,
    },
  },
  diffusion: {
    name: 'diffusion',
    config: {
      charge: 50,
    },
  },
}

export const isBehaviorName = (val: unknown): val is Behavior['name'] =>
  typeof val === 'string' && val in behaviors

const boundings = new Set<Bounding>([
  'centerScaling',
  'edgeBinding',
  'lengthBinding',
  'edgeWrapping',
])

export const isBounding = (val: unknown): val is Bounding =>
  typeof val === 'string' && boundings.has(val as Bounding)
