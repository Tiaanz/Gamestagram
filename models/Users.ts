export interface UserDB {
  username: string
  email: string
  auth0Id: string
  bio: string
  photoUrl: string
}

export interface User extends UserDB {
  id: number
  dateSignUp: Date
}
