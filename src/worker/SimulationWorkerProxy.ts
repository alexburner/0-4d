import { expose } from 'comlink'
import { SimulationWorker } from './SimulationWorker'

expose(new SimulationWorker())
