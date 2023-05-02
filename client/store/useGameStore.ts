import { create } from 'zustand'

import type { GameDB} from '../../models/Game'
import { getGameByApiId } from '../apis/apiClientGames'


interface IGame {
  game: GameDB
  fetchGame: (id: string) => void
}

export const useGameStore = create<IGame>((set) => ({
  game: {
    apiId: '',
    name: '',
    description: '',
    averagePlayTime: '',
    playerCount: '',
    photoUrl: '',
  },
  fetchGame: async (id: string) => {
    const game = await getGameByApiId(id)
    set({ game: game })
  },
}))
