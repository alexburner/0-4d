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

export const isBehaviorName = (val: unknown): val is Behavior['name'] =>
  typeof val === 'string' && val in behaviors

const boundings = new Set(['centerScaling', 'edgeBinding'])
export const isBounding = (val: unknown): val is Bounding =>
  typeof val === 'string' && boundings.has(val)

const viewNames = ['stacking', 'trailing'] as const
const viewNameSet = new Set<string>(viewNames)
type ViewName = typeof viewNames[number]
export const isViewName = (val: unknown): val is ViewName =>
  typeof val === 'string' && viewNameSet.has(val)
