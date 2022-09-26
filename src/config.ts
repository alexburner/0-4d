import { Behavior } from './simulation/Behavior'
import { Bounding } from './simulation/Bounding'

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
      jitter: 0.3,
    },
  },
}

const boundings = new Set(['centerScaling', 'edgeBinding'])

export const isBehaviorName = (val: unknown): val is Behavior['name'] =>
  typeof val === 'string' && val in behaviors

export const isBounding = (val: unknown): val is Bounding =>
  typeof val === 'string' && boundings.has(val)
