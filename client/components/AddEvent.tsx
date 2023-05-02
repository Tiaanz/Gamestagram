import { useEffect, useState } from 'react'
import { addEvents } from '../apis/apiClientEvents'
import { getGameByApiId, addGame } from '../apis/apiClientGames'
import { useUserStore } from '../store/useUserStore'
import { Game, GameDB } from '../../models/Game'
import { Autocomplete, TextField } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useGamesStore } from '../store/useGamesStore'
import { shallow } from 'zustand/shallow'

export function Addevent() {
  const { games, fetchGamesFromAPI} = useGamesStore(
    (state) => ({
      games: state.games,
      isLoading: state.isLoading,
      fetchGamesFromAPI: state.fetchGamesFromAPI,
      setGames: state.setGames,
    }),
    shallow
  )

  const navigate = useNavigate()
  const currentUser = useUserStore((state) => state.currentUser)
  const [selectedGameId, setSelectedGameId] = useState('')
  const [gameName, setGameName] = useState('')
  const [disButton, setDisButton] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [filteredGames, setFilteredGames] = useState<GameDB[]>(games)
  const [address, setAddress] = useState<string | undefined>('')

  const options = {
    types: ['geocode'],
    componentRestrictions: { country: 'nz' },
  }


  useEffect(() => {
    fetchGamesFromAPI(100)
    const filtered = games.filter((game) =>
      game.name.toLowerCase().includes(gameName.toLowerCase())
    )
    setFilteredGames(filtered)

  }, [games, gameName])

  useEffect(() => {
    const input = document.getElementById('autocomplete') as HTMLInputElement
    const autocomplete = new google.maps.places.Autocomplete(input, options)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      setAddress(place.formatted_address)
    })
  }, [])

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleGameChange = (
    event: React.SyntheticEvent<Element, Event>,
    game: Game
  ) => {
    if (game) {
      setSelectedGameId(game.apiId)
      setGameName(game.name)
    } else {
      setSelectedGameId('')
      setGameName('')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedGameId) {
      alert('Please select a valid game.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const eventName = formData.get('eventName') as string
    const description = formData.get('description') as string
    const numberPpl = formData.get('numberPpl') as string
    const hostId = currentUser.id
    const time = formData.get('time') as string
    const date = formData.get('date') as string
    const FormattedDate = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')
    const timeDb = `${FormattedDate} ${time}`

    const newEvent = {
      event_name: eventName,
      host_id: hostId, // need to repalce this with daynmci variable
      description,
      number_ppl_playing: numberPpl,
      game_id: selectedGameId,
      location: address,
      time: timeDb,
    }

    const apiGame = games.find((game) => game.apiId === selectedGameId)
    if (apiGame) {
      const newGame = {
        name: apiGame?.name,
        api_id: apiGame?.apiId,
        description: apiGame?.description,
        play_time: apiGame?.averagePlayTime,
        number_player: apiGame?.playerCount,
        photo_url: apiGame?.photoUrl,
      }
      const apiId = await getGameByApiId(selectedGameId)
      if (apiId) {
        await addEvents(newEvent)
      } else {
        await addGame(newGame)
        await addEvents(newEvent)
      }
    }
    setDisButton(true)
    setSuccess(true)
    setTimeout(() => {
      navigate('/my-events')
    }, 2000)
  }
  return (
    <>
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div>
            {success && (
              <p className="text-green-500 mb-5 text-center">
                Event added successfully!
              </p>
            )}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add New Event
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Autocomplete
                disablePortal
                value={
                  filteredGames.find((game) => game.apiId === selectedGameId) ||
                  null
                }
                id="gameName"
                options={filteredGames}
                getOptionLabel={(game) => game.name}
                onChange={handleGameChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Game Name"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                  />
                )}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="gameName"
              />
            </div>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="eventName" className="sr-only">
                  Event name
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Event Name"
                />
              </div>
              <br></br>
              <div>
                <label htmlFor="date">Choose a date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                ></input>
                <br></br>
                <label htmlFor="time">Choose a time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                ></input>
              </div>
              <br></br>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                />
              </div>
              <br></br>
              <div>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="autocomplete"
                  name="location"
                  value={address}
                  onChange={handleAddressChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your address"
                />
              </div>
              <br></br>

              <div>
                <label htmlFor="numberPpl">Number of Players:</label>
                <input
                  type="text"
                  id="numberPpl"
                  name="numberPpl"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Number of People"
                />
              </div>
              <br></br>
              {!disButton && (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
