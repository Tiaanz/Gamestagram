import { useState, useEffect } from 'react'
import { EditEvent } from '../../../models/Event'
import { updateEvent, getEventById } from '../../apis/apiClientEvents'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import ImageBanner from '../subcomponents/ImageBanner'

export default function EditEventPage() {
  const { id } = useParams()
  const options = {
    types: ['geocode'],
    componentRestrictions: { country: 'nz' },
  }

  const nav = useNavigate()
  const [event, setEvent] = useState<EditEvent>({
    hostId: 0,
    time: '',
    eventName: '',
    location: '',
    description: '',
    numberOfPeople: '',
  })

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEventById(Number(id)).then((event) => {
      setEvent(event)
    })
  }, [])

  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [hour, setHour] = useState<string>('')
  const [day, setDay] = useState<string>('')

  useEffect(() => {
    destructureTime()
    console.log(event.time)
  }, [event.time])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const formData = new FormData(form)
    // const description = formData.get('description') as string
    // const numberPpl = formData.get('numberOfPeople') as string

    const FormattedDate = moment(day, 'YYYY-MM-DD').format('DD-MM-YYYY')
    const timeDb = `${FormattedDate} ${hour}`

    try {
      const newEvent = {
        id: id,
        number_ppl_playing: event.numberOfPeople,
        time: timeDb,
        event_name: event.eventName,
        location: event.location,
        description: event.description,
      }

      await updateEvent(Number(id), newEvent)
      setSuccess(true)
      setTimeout(() => {
        nav('/my-events')
      }, 1800)
    } catch (error) {
      setError('Failed to update event.')
    }
  }

  const setupAutoComplete = () => {
    const input = document.getElementById('autocomplete') as HTMLInputElement
    const autocomplete = new google.maps.places.Autocomplete(input, options)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      setEvent((data) => ({ ...data, location: place.formatted_address }))
    })
  }
  setupAutoComplete()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'location') {
      setEvent((data) => ({ ...data, location: value }))
    } else if (name !== 'time' && name !== 'date') {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }))
    }
    if (name === 'time') {
      setHour(e.target.value)
    } else if (name === 'date') {
      setDay(e.target.value)
    }
  }

  function destructureTime() {
    const newTime = event.time
    const result = newTime.split(' ')
    const formattedDay = moment(result[0], 'DD-MM-YYYY').format('YYYY-MM-DD')
    const newHour = result[1]
    setHour(newHour)
    setDay(formattedDay)
  }

  return (
    <>
      <ImageBanner name="Events" url="/pics/banner3.jpg" />
      <div className="max-w-md mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-5">Edit Event</h1>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        {success && (
          <p className="text-green-500 mb-5">Event updated successfully!</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-gray-300 p-4"
        >
          <div>
            <label htmlFor="date"> Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={day}
              onChange={handleInputChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            ></input>
            <label htmlFor="time" className="block font-medium mb-2 ">
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={hour}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></input>
          </div>
          <div>
            <label htmlFor="eventName" className="block font-medium mb-2">
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={event.eventName}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-medium mb-2">
              Location:
            </label>
            <input
              type="text"
              id="autocomplete"
              name="location"
              value={event.location}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="numberOfPeople" className="block font-medium mb-2">
              Number of People:
            </label>
            <textarea
              id="numberOfPeople"
              name="numberOfPeople"
              value={event.numberOfPeople}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}
