import { create } from 'zustand'
import type { GameDB} from '../../models/Game'
import { getGames, getGamesFromAPI } from '../apis/apiClientGames'

interface IGame {
  games: GameDB[]
  isLoading:boolean
  fetchGames: () => void
  fetchGamesFromAPI: (limit:string|number) => void
  setGames:(games:GameDB[])=>void
}

export const useGamesStore = create<IGame>((set) => ({
  games: [] as GameDB[],
  isLoading:false,
  fetchGames: async () => {
    const games = await getGames()
    set({ games: games })
  },
  fetchGamesFromAPI: async (limit: string | number) => {
    set({isLoading:true})
    const externalGames = await getGamesFromAPI(limit)
    const games = externalGames.map((game:any) => ({
      apiId: game.id,
      name: game.name,
      description: game.description,
      averagePlayTime: game.playtime,
      playerCount: game.players,
      photoUrl: game.image_url,
    }))
 
    
    set({ games: games })
    set({isLoading:false})
  },
  setGames:(games:GameDB[]) => {
    set({games:games})
  }
}))
