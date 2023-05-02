import request from 'superagent'
import {
  FormattedEventWithUser,
  UserJoinEvent,
  EditEvent,
  snakeEvent
} from '../../models/Event'



const rootUrlEvents = '/api/v1/events'

export async function getEvents() {
  const res = await request.get(rootUrlEvents)
  return res.body as Promise<FormattedEventWithUser[]>
}

export async function getEventById(id: number) {
  const res = await request.get(`${rootUrlEvents}/${id}`)
  return res.body as Promise<FormattedEventWithUser>
}


export async function getEventsByUserId(id: number) {
  const res = await request.get(`${rootUrlEvents}/my-events/user/${id}`)
  return res.body 
}


export async function addEvents(newEvent: snakeEvent) {
  return await request.post(`${rootUrlEvents}/add`).send(newEvent)
}

export async function cancelUserEvent(id: number) {
  await request.delete(`${rootUrlEvents}/my-events/${id}`)
}

export async function cancelEvent(id: number) {
  await request.patch(`${rootUrlEvents}/${id}/cancel`)
}

export async function updateEvent(id: number, input: EditEvent) {
  return await request.patch(`${rootUrlEvents}/${id}/edit`).send(input)
}

export async function addUserEvent(input: UserJoinEvent) {
  await request.post(`${rootUrlEvents}/add/user-event`).send(input)
}
