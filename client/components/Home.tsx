import EventCard from './EventCard'
import GameCard from './GameCard'
import { useEventsStore } from '../store/useEventsStore'
import { useGamesStore } from '../store/useGamesStore'
import { shallow } from 'zustand/shallow'
import { useEffect } from 'react'
import ImageBanner from './subcomponents/ImageBanner'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'


function Home() {
  const { events, fetchEvents } = useEventsStore(
    (state) => ({ events: state.events, fetchEvents: state.fetchEvents }),
    shallow
  )

  const { games, fetchGamesFromAPI, isLoading } = useGamesStore(
    (state) => ({
      games: state.games,
      isLoading: state.isLoading,
      fetchGamesFromAPI: state.fetchGamesFromAPI,
    }),
    shallow
  )

  useEffect(() => {
    fetchEvents()
    fetchGamesFromAPI(6)
  }, [])

  return (
    <>
      <ImageBanner name="Welcome to Gamestagram!" url="./pics/banner1.jpg" />
      <main className="container mx-auto">
        <h2 className="mt-5  font-sans text-4xl font-bold text-center md:text-left">
          Events
        </h2>

        <section className="relative flex items-center">
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth snap-x "
          >
            {events.map((event) => {
              if (event.status === 'open') {
                return <EventCard key={event.eventId} event={event} />
              }
            })}
          </div>
        </section>
         <Link to={'/events'}>
        <div className="text-right text-xl mt-4 text-purple-500">
          More &gt;&gt;
        </div>
           </Link>


        <h2 className=" my-10 font-sans text-4xl font-bold text-center md:text-left">
          Popular Games
        </h2>
        {!isLoading ? (
          <>
            <section className="flex justify-around flex-wrap">
              {games.map((game) => (
                <GameCard key={game.name} game={game} />
              ))}
            </section>

            <Link to={'/boardgames'}>
            <div className="text-right text-xl mt-4 text-purple-500">
              More &gt;&gt;
              </div>
              </Link>
          </>
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
      </main>
    </>
  )
}

export default Home
