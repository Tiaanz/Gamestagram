import { useParams } from 'react-router-dom'
import { getUserById } from '../../apis/apiClientUsers'
import { useEffect, useState } from 'react'
import { UserDeets } from '../../../models/Users'
import { useAuth0 } from '@auth0/auth0-react'

export default function UserDetails() {
  const { id } = useParams()
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const [user, setUser] = useState<UserDeets>({
    id: 0,
    username: '',
    email: '',
    bio: '',
    photoUrl: '',
  })

  const handleLogIn = () => {
    console.log('log in function ran')

    loginWithRedirect({
      redirectUri: 'http://localhost:3000',
    })
  }
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getUserById(Number(id)).then((user) => {
      setUser(user)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuthenticated ? (
    <>
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Profile</h2>
            <p className="mt-2 text-lg font-medium text-gray-900">
              {user.username}
            </p>

            <img
              src={user.photoUrl ? user.photoUrl : '/pics/default-avatar.png'}
              alt="userPhoto"
              className="mt-4 h-32 w-32 rounded-full mx-auto"
            ></img>

            <p className="py-6 mt-1 text-md text-gray-500">{user.bio}</p>
            <div className="py-8 underline">
              <a href={`mailto:${user.email}`}>Send an email</a>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="container py-10 px-10 mx-0 min-w-full grid place-items-center">
        <div className="text-4xl text-center py-20">
          You have to signed in to view this page
        </div>
        <div>
          <button
            className="mr-5 underline text-center text-2xl"
            onClick={handleLogIn}
          >
            <p>Click me to go the login page!</p>
          </button>
        </div>
      </div>
    </>
  )
}
