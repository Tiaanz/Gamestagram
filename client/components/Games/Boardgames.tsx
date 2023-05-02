import { useEffect } from 'react'
import ImageBanner from '../subcomponents/ImageBanner'
import GameCard from './GameCard'
import { useGamesStore } from '../../store/useGamesStore'
import { shallow } from 'zustand/shallow'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Boardgames() {
  const { games, fetchGamesFromAPI, setGames, isLoading } = useGamesStore(
    (state) => ({
      games: state.games,
      isLoading: state.isLoading,
      fetchGamesFromAPI: state.fetchGamesFromAPI,
      setGames: state.setGames,
    }),
    shallow
  )

  useEffect(() => {
    fetchGamesFromAPI(100)
  }, [])

  function filterGame(input: string) {
    if (input !== '') {
      const filterdGames = games.filter((game) =>
        game.name.toLowerCase().includes(input)
      )
      setGames(filterdGames)
    } else {
      fetchGamesFromAPI(100)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const keyword = event.target.value
    filterGame(keyword)
  }

  return (
    <>
      <ImageBanner name="Boardgames" url="./pics/banner2.webp" />
      <div className="mt-36 mx-auto w-4/5 ">
        <form className="w-full flex justify-center">
          <div className=" w-3/4 sm:w-3/5 md:w-2/4  lg:w-3/5 flex items-center relative">
            <input
              className=" h-12 px-5 pr-10 border rounded-full w-full text-lg sm:text-xl focus:outline-none shadow-sm"
              placeholder="Search your favorite game"
              type="text"
              onChange={handleChange}
            />
            <button type="submit" className="absolute right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </form>
        {!isLoading ? (
          <section className="flex mt-32 flex-wrap justify-start">
            {games.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </section>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!isLoading && games.length === 0 && (
          <h1 className="text-2xl text-blue-600">Game not found</h1>
        )}
      </div>
    </>
  )
}
