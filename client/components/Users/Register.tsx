import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

import {
  addUser,
  getUserByAuth0Id,
  editUserById,
} from '../../apis/apiClientUsers'

import { useUserStore } from '../../store/useUserStore'

export default function Register() {
  const currentUser = useUserStore((state) => state.currentUser)
  const setUser = useUserStore((state) => state.setUser)

  const { user, isLoading } = useAuth0()
  const [showRegister, setshowRegister] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    if (user?.sub) {
      {
        fetchUser(user.sub)
      }
    }
  }, [user, showRegister, currentUser.id])

  async function fetchUser(authId: string) {
    const userDB = await getUserByAuth0Id(authId)

    if (userDB) {
      setUser({
        id: userDB.id,
        userName: userDB.username,
        photoUrl: userDB.photoUrl,
        bio: userDB.bio,
        email: userDB.email,
      })
    } else {
      setshowRegister(true)
    }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (user && user.email && user.sub) {
      const form = event.currentTarget
      const formData = new FormData(form)
      const userName = formData.get('userName') as string
      const photoUrl = formData.get('photoUrl') as string
      const bio = formData.get('bio') as string
      const email = user?.email
      const auth0Id = user?.sub
      const newUser = {
        user_name: userName,
        photo_url: photoUrl,
        bio,
        email,
        auth0_Id: auth0Id,
      }
      await addUser(newUser)
      setshowRegister(false)
    } 
  }

  const handleClickImageButton = () => {
    setShowForm(!showForm)
  }

  async function handlePhotoUrlChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPhotoUrl(event.target.value)
  }

  async function updateProfilePic() {
    await editUserById(currentUser.id, photoUrl)
  }

  return (
    <>
      {showRegister && !isLoading ? (
        <>
          <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Register
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div className="shadow-sm space-y-4">
                  <div className="rounded">
                    <label htmlFor="userName" className="sr-only">
                      User name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      autoComplete="userName"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="User name"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="sr-only">
                      Bio
                    </label>
                    <input
                      type="text"
                      id="bio"
                      name="bio"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Bio"
                    />
                  </div>
                  <div className="rounded-lg">
                    <label htmlFor="photoUrl" className="sr-only">
                      Photo Url
                    </label>
                    <input
                      type="photoUrl"
                      name="photoUrl"
                      id="photoUrl"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Photo Url"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </>
      ) : currentUser.userName ? (
        !isLoading && (
          <>
            <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md mx-auto ">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    {currentUser.userName}
                  </h2>
                  <div className="flex flex-col items-center">
                    <div className="mt-4 mb-2 h-64 w-64 rounded-full">
                      <img
                        src={
                          currentUser.photoUrl
                            ? currentUser.photoUrl
                            : '/pics/default-avatar.png'
                        }
                        alt="userPhoto"
                        className="object-cover h-full w-full rounded-full"
                      />
                    </div>
                    <div className="mt-4 ">
                      <button
                        onClick={handleClickImageButton}
                        className="w-8 h-8 rounded-full bg-gray-400 hover:bg-indigo-500 text-white flex items-center justify-center text-2xl focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {showForm && (
                    <form className="mt-4">
                      <label htmlFor="photoUrl">Updated Image: </label>
                      <input
                        type="photoUrl"
                        name="photoUrl"
                        id="photoUrl"
                        placeholder="Update your Profile Pic"
                        value={photoUrl}
                        onChange={handlePhotoUrlChange}
                      ></input>
                      <button
                        type="submit"
                        onClick={updateProfilePic}
                        className="bg-gray-400 hover:bg-indigo-500 text-white font-bold py-1 px-2 rounded ml-1"
                      >
                        Submit
                      </button>
                    </form>
                  )}

                  <p className="mt-6 mb-2 text-md text-gray-500 text-center">
                    {currentUser.bio}
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      ) : currentUser.id ? (
        <p>Please log in</p>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  )
}
