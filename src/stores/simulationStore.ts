import create from 'zustand'
import { SimulationData } from '../simulation/Simulation'

interface SimulationStore {
  simulations: SimulationData[] | undefined
  updateSimulations: (next: SimulationData[]) => void
}

export const createUseSimulationsStore = () =>
  create<SimulationStore>((set) => ({
    simulations: undefined,
    updateSimulations: (next) => set({ simulations: next }),
  }))

export type UseSimulationsStore = ReturnType<typeof createUseSimulationsStore>
