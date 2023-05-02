import { useEffect } from 'react'
import { useEventsStore } from '../store/useEventsStore'
import { shallow } from 'zustand/shallow'
import EventCard from './EventCard'
import ImageBanner from './subcomponents/ImageBanner'

const Events = () => {
  const { events, fetchEvents, setFilteredEvents } = useEventsStore(
    (state) => ({
      events: state.events,
      fetchEvents: state.fetchEvents,
      setFilteredEvents: state.setFilterEvents,
    }),
    shallow
  )

  useEffect(() => {
    fetchEvents()
  }, [])

  function filterGame(input: string) {
    const filterdEvents = events.filter((event) =>
      event.gameName.toLowerCase().includes(input)
    )
    setFilteredEvents(filterdEvents)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const keyword = event.target.value
    if (keyword) {
      filterGame(keyword)
    } else {
      fetchEvents()
    }
  }

  return (
    <>
      <ImageBanner name="Events" url="./pics/banner3.jpg" />
      <div className="mt-36 mx-auto w-4/5">
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
        <section className="flex mt-32 flex-wrap justify-start">
          {events[0] ? (
            events.map((event) => {
              if (event.status === 'open') {
                return <EventCard key={event.eventId} event={event} />
              }
            })
          ) : (
            <h1>Game is not found, please search again.</h1>
          )}
        </section>
      </div>
    </>
  )
}

export default Events
