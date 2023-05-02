import { useEventStore } from '../../store/useEventStore'
import { shallow } from 'zustand/shallow'
import { getUserById } from '../../apis/apiClientUsers'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { addUserEvent } from '../../apis/apiClientEvents'
import { useGameStore } from '../../store/useGameStore'
import { useAuth0 } from '@auth0/auth0-react'
import { CiLocationOn, CiTimer } from 'react-icons/ci'
import ImageBanner from '../subcomponents/ImageBanner'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import Map from '../subcomponents/Map'

function EventDetail() {
  const { loginWithRedirect } = useAuth0()
  const currentUser = useUserStore((state) => state.currentUser)

  const [host, setHost] = useState({
    username: '',
    photoUrl: '',
  })

  const { id } = useParams()
  const { event, fetchEvent } = useEventStore(
    (state) => ({
      event: state.event,
      fetchEvent: () => state.fetchEvent(Number(id)),
    }),
    shallow
  )

  const { game, fetchGame } = useGameStore(
    (state) => ({ game: state.game, fetchGame: state.fetchGame }),
    shallow
  )

  useEffect(() => {
    fetchGame(event.gameId)
    fetchEvent()

    if (event.hostId) {
      fetchHost(event.hostId)
    }
  }, [event.hostId, currentUser.id])

  async function fetchHost(id: number) {
    const host = await getUserById(id)

    setHost(() => ({
      username: host.username,
      photoUrl: host.photoUrl,
    }))
  }

  async function handleSumbit() {
    if (currentUser.id !== 0) {
      await addUserEvent({ eventId: Number(id), userId: currentUser.id })
      fetchEvent()
    } else {
      loginWithRedirect({
        redirectUri: 'http://localhost:3000/profile',
      })
    }
  }

  return (
    <>
      <ImageBanner name="Events" url="/pics/banner3.jpg" />
      <section className="w-full">
        <div className="flex flex-row justify-around w-5/6  m-auto">
          <div className="flex flex-col items-center w-3/5 my-4">
            <img
              className="h-80 rounded-xl"
              src={`${event.gamePhoto}`}
              alt={`${event.gameName}`}
            />
            <div className="my-6 w-2/3 mx-6">
              <ul>
                <li>
                  <span className="font-bold text-2xl">
                    Event: {event.eventName}
                  </span>
                </li>
                <li>
                  <span className="font-bold text-2xl">
                    Game: {event.gameName}
                  </span>
                </li>
                <li>
                  <span className="my-2 text-lg">
                    <b>Description:</b> {event.description}
                  </span>
                </li>

                <li>
                  <span className="my-2 text-lg">
                    <b>Suggested Players: </b>
                    {event.numberOfPeople}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-2/5  justify-center ">
            <div className="my-5">
              <ul>
                <li className="flex">
                  <CiLocationOn /> &nbsp;&nbsp;&nbsp;
                  <b>Location:</b> {event.location}
                </li>
                <li className="flex">
                  <CiTimer /> &nbsp;&nbsp;&nbsp;
                  <b>Time:</b> {event.time}
                </li>
              </ul>
            </div>
            <div>
              <Map address={event.location} />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between w-5/6 m-auto">
          <div className="w-2/5 flex flex-col items-center">
            <h4 className="font-semibold text-slate-900">Host</h4>

            <div
              key={host.username}
              className=" group text-right sm:h-32  mt-10 group relative duration-300"
            >
              <Link to={`/users/${event.hostId}`}>
                <img
                  className="object-center inline-block w-14 h-14 rounded-full ring-2 ring-white"
                  src={
                    host.photoUrl ? host.photoUrl : '/pics/default-avatar.png'
                  }
                  alt={`${host.username}`}
                />
                <span className="absolute hidden group-hover:flex -right-1 -top-2 -translate-y-full  px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                  {host.username}
                </span>
              </Link>
            </div>
          </div>

          <div className="w-2/5 flex flex-col items-center">
            <div className="flex flex-row">
              <h4 className="font-semibold text-slate-900">Players</h4>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                {event.users.length}
              </span>
            </div>
            <div className=" flex flex-row-reverse">
              {event.users.map((user) => {
                return (
                  <div
                    key={user.name}
                    className=" group text-right sm:h-32 h-14 mt-10 group relative duration-300"
                  >
                    <Link to={`/users/${user.userId}`}>
                      <img
                        className="object-center inline-block w-14 h-14 rounded-full ring-2 ring-slate-200"
                        src={
                          user.photoUrl
                            ? user.photoUrl
                            : '/pics/default-avatar.png'
                        }
                        alt={`${user.name}`}
                      />
                      <span className="absolute hidden group-hover:flex -right-1 -top-2 -translate-y-full  px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                        {user.name}
                      </span>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-around w-5/6 m-auto">
          <div className="flex float-left justify-center w-2/5 my-5 ">
            <Link
              className="w-1/2 py-4 text-center  bg-purple-300 drop-shadow-md  hover:drop-shadow-xl rounded-lg text-l"
              to={'/events'}
            >
              Return to all events
            </Link>
          </div>
          <div className="flex float-right w-3/5 h-1/6 my-6 justify-around ">
            {event.users.find((e) => e.userId === currentUser.id) ? (
              <button className="w-1/3  py-4 text-center  bg-purple-300 drop-shadow-md  hover:drop-shadow-xl rounded-lg text-l">
                You are going
              </button>
            ) : (
              <button
                onClick={handleSumbit}
                className="w-1/3 py-4 text-center  bg-stone-300 drop-shadow-md hover:bg-stone-400 hover:drop-shadow-xl rounded-lg text-l"
              >
                Join
              </button>
            )}

            <button className="w-1/3 py-4 text-center  bg-stone-300 drop-shadow-md hover:bg-stone-400 hover:drop-shadow-xl rounded-lg text-l">
              Message
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default EventDetail
