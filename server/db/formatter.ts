import { Event, FormattedEventWithUser } from '../../models/Event'

export function createEvent(eventLine: Event) {
  return {
    eventId: eventLine.eventId,
    time: eventLine.time,
    gameId: eventLine.gameId,
    hostId: eventLine.hostId,
    location: eventLine.location,
    status: eventLine.status,
    eventName: eventLine.eventName,
    numberOfPeople: eventLine.numberOfPeople,
    createdAt: eventLine.createdAt,
    description: eventLine.description,
    gameName: eventLine.gameName,
    gamePhoto: eventLine.gamePhoto,
    users: [createUser(eventLine)],
  }
}

export function createUser(eventLine: Event) {
  return {
    userId: eventLine.userId,
    name: eventLine.userName,
    photoUrl: eventLine.photoUrl,
    email: eventLine.email,
  }
}

export function formatEvent(eventLines: Event[]) {
  let event: FormattedEventWithUser | undefined
  eventLines.forEach((item) => {
    !event ? (event = createEvent(item)) : event.users.push(createUser(item))
  })
  return event
}

export function formatEventList(eventLines: Event[]) {
  const eventList = [] as FormattedEventWithUser[]
  eventLines.forEach((item) => {
    const event = eventList.find((e) => e.eventId === item.eventId)
    !event
      ? eventList.push(createEvent(item))
      : (event.users = [createUser(item)])
  })
  return eventList
}
