import request from 'supertest'

import server from '../server'
import * as db from '../db/users'

jest.mock('../db/users')

test('GET /users should return an array of users', async () => {
  const mockGetUsers = jest.mocked(db.getUsers)
  mockGetUsers.mockResolvedValue([
    {
      username: 'Ke123',
      email: 'maxeipk@gmail.com',
      bio: "A new web developer with a love for board games. Driven by my passion for learning and exploring new areas, I'm always on the lookout for exciting opportunities to grow my skills. In my free time, you can often find me deep in thought, strategizing over a game of Root or Scythe",
      photoUrl:
        'https://rs1.huanqiucdn.cn/dp/api/files/imageDir/bfc32da8a7fae22a0bdc8af7d67379c2.jpeg',
      id: 1,
      dateSignUp: new Date(),
      auth0Id: 'kjuh1kj23sd',
    },
  ])

  const response = await request(server).get('/api/v1/users')

  expect(response.status).toBe(200)

  expect(response.body[0].auth0Id).toBe('kjuh1kj23sd')
})


