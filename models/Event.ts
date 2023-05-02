export interface EventDB {
  hostId: number
  gameId: string
  eventName: string
  location: string
  time: string
  gameName: string
  description: string
  status: string
  numberOfPeople: string
  createdAt: string
  gamePhoto: string
  userId: number
  userName: string
  photoUrl: string
  email: string
}

export interface Event extends EventDB {
  eventId: number
}

export interface MyEvent {
  eventId: number
  userId: number
  hostId: number
  userEventId: number
  eventName: string
  time: string
  location: string
  status: string
}

export interface EventUser {
  userId: number
  name: string
  photoUrl: string
  email: string
}

export interface FormattedEventWithUser {
  eventId: number
  hostId: number
  eventName: string
  gameId: string
  location: string
  time: string
  status: string
  description: string
  numberOfPeople: string
  createdAt: string
  gameName: string
  gamePhoto: string
  users: EventUser[]
}

export interface UserEventDB {
  user_id: number
  event_id: number
  created_at: Date
}

export interface UserJoinEvent {
  userId: number
  eventId: number
}

export interface EditEvent {
  hostId: number
  time: string
  eventName: string
  location: string | undefined
  description: string
  numberOfPeople: string
}

export interface Status {
  status: string
}

export interface snakeEvent {
  host_id: number
  event_name: string
  game_id: string
  description: string
  location: string |undefined
  time: string
  number_ppl_playing: string
}