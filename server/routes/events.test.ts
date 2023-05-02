import request from 'supertest'

import server from '../server'
import * as db from '../db/events'

jest.mock('../db/events')

test('GET /events should return an array of events', async () => {
  const mockGetEvents = jest.mocked(db.getEvents)
  mockGetEvents.mockResolvedValue([
    {
      eventId: 2,
      time: '21-07-2023 21:00',
      gameId: 'yqR4PtpO8X',
      hostId: 1,
      location: '8 Morgan st, Auckland',
      eventName: 'Borad game is the best',
      status: 'open',
      numberOfPeople: '2-4',
      createdAt: '1681453450',
      description: 'do you want to play?',
      gameName: 'Scythe',
      gamePhoto:
        'https://cdn.shopify.com/s/files/1/0513/4077/1515/products/scythe-board-game.jpg?v=1611090922',
      users: [
        {
          userId: 2,
          name: 'frank332',
          photoUrl:
            'https://st2.depositphotos.com/1071909/6630/i/450/depositphotos_66306151-stock-photo-programmer-click-on-keypad-api.jpg',
          email: 'fank_hall@gmail.com',
        },
        {
          userId: 1,
          name: 'Ke123',
          photoUrl:
            'https://st2.depositphotos.com/1071909/6630/i/450/depositphotos_66306151-stock-photo-programmer-click-on-keypad-api.jpg',
          email: 'maxeipk@gmail.com',
        },
      ],
    },
  ])

  const response = await request(server).get('/api/v1/events')

  expect(response.status).toBe(200)

  expect(response.body[0].gameId).toBe('yqR4PtpO8X')
})

test('GET /events/:id should return an object of event', async () => {
  const mockGetEvents = jest.mocked(db.getEventsById)
  mockGetEvents.mockResolvedValue({
    eventId: 2,
    time: '21-07-2023 21:00',
    gameId: 'yqR4PtpO8X',
    hostId: 1,
    location: '8 Morgan st, Auckland',
    eventName: 'Ke home party',
    status: 'open',
    numberOfPeople: '2-4',
    createdAt: '1681453450',
    description: 'do you want to play?',
    gameName: 'Scythe',
    gamePhoto:
      'https://cdn.shopify.com/s/files/1/0513/4077/1515/products/scythe-board-game.jpg?v=1611090922',
    users: [
      {
        userId: 2,
        name: 'frank332',
        photoUrl:
          'https://st2.depositphotos.com/1071909/6630/i/450/depositphotos_66306151-stock-photo-programmer-click-on-keypad-api.jpg',
        email: 'fank_hall@gmail.com',
      },
    ],
  })

  const response = await request(server).get('/api/v1/events/1')

  expect(response.status).toBe(200)

  expect(response.body.eventName.includes('Ke')).toBeTruthy()
})

test('GET /my-events/user/: should return an array of event', async () => {
  const mockGetEvents = jest.mocked(db.getEventsByUserId)
  mockGetEvents.mockResolvedValue([
    {
      eventId: 1,
      userId: 1,
      hostId: 2,
      userEventId: 2,
      eventName: 'ke home party',
      time: '20-04-2023 21:00',
      location: '10 Morgan st, Auckland',
      status: 'open',
    },
  ])

  const response = await request(server).get('/api/v1/events/my-events/user/2')

  expect(response.status).toBe(200)
  expect(response.body[0].location.includes('Morgan')).toBeTruthy()
})

test('POST /add should accept a body and respond with 201 ', async () => {
  jest.mocked(db.addEvent).mockResolvedValue([123])
  const response = await request(server).post('/api/v1/events/add').send({
    host_id: 3,
    event_name: "Let's play sychat",
    game_id: 2,
    description: 'have fun together',
    location: 'sun',
    time: '22-04-2023 18:00',
    number_ppl_playing: '6-8',
  })

  expect(response.status).toBe(201)
})

test('PATCH /:id/edit should return an array with updated event ', async () => {
  jest.mocked(db.editEvent).mockResolvedValue([
    {
      eventId: 1,
      hostId: 2,
      gameId: 'yqR4PtpO8X',
      eventName: "Let's play sychat!!!",
      location: '57 happy road',
      time: '22-04-2023 18:00',
      gameName: 'sychat',
      description: 'have fun together',
      status: 'open',
      createdAt: '2012',
      numberOfPeople: '20-49',
      gamePhoto: 'http://',
      userId: 2,
      userName: 'Tian',
      photoUrl: 'hedhhd',
      email: 'jwtian@gmail.com',
    },
  ])
  const response = await request(server).patch('/api/v1/events/1/edit').send({
    event_name: "Let's play sychat!!!!",
  })

  expect(response.status).toBe(200)
  expect(response.body[0].eventName.includes('sychat')).toBeTruthy()
})

test('DELETE /my-events/:userEventId should return status 200 ', async () => {
  jest.mocked(db.cancelUserEvent).mockResolvedValue(123)
  const response = await request(server).delete('/api/v1/events/my-events/1')

  expect(response.status).toBe(200)
})

test('PATCH /:id/cancel should return an array with updated event ', async () => {
  jest.mocked(db.cancelEvent).mockResolvedValue([
    {
      eventId: 1,
      hostId: 2,
      gameId: 'yqR4PtpO8X',
      eventName: "Let's play sychat!!!",
      location: '57 happy road',
      time: '22-04-2023 18:00',
      gameName: 'sychat',
      description: 'have fun together',
      status: 'closed',
      createdAt: '2012',
      numberOfPeople: '20-49',
      gamePhoto: 'http://',
      userId: 2,
      userName: 'Tian',
      photoUrl: 'hedhhd',
      email: 'jwtian@gmail.com',
    },
  ])
  const response = await request(server).patch('/api/v1/events/1/cancel').send({
    status: 'closed'
  })

  expect(response.status).toBe(200)
  expect(response.body[0].status.includes('closed')).toBeTruthy()
})
