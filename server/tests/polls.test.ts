import supertest from 'supertest'
import app from '../index'
import dbPool from '../db'
import { MikroORM, IDatabaseDriver, Connection } from '@mikro-orm/core'

const examplePoll = {
  "title": "What's your favorite color?",
  "choices": [
    "red",
    "green",
    "blue"
  ]
}

const api = supertest(app)
let em: MikroORM<IDatabaseDriver<Connection>>

beforeAll(async () => {
  em = await dbPool()
})

describe('polls', () => {
  // TODO actually check for JSON lol
  test('are returned as json', async () => {
    await api
      .get('/polls')
      .expect(200)
  })
})

describe('creating a poll', () => {
  test('is successful with valid parameters', async () => {
    await api
      .post('/polls/create')
      .send(examplePoll)
      .expect(200)
  })
})

afterAll(async () => {
  await em.close()
})