import { wrap } from 'comlink'
import { times } from 'lodash'
import { Simulation } from './Simulation'
import SimulationWorker from './SimulationWorker?worker'

export const createWorkers = (dimensionCount: number) =>
  times(dimensionCount, () => wrap<Simulation>(new SimulationWorker()))
