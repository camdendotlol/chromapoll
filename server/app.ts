import express from 'express'
import { MikroORM } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb'
import cors from 'cors'
import db from './db'
import { Choice } from './entities/Choice'
import { Poll } from './entities/Poll'
import { pollController } from './controllers/poll.controller'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/polls', pollController)

// Catch all remaining requests to nonexisting routes
app.use('/api/*', (req, res) => res.status(404).json({ message: 'Resource not found' }))

interface DatabaseInfo {
  orm: MikroORM,
  em: EntityManager,
  pollRepository: EntityRepository<Poll>,
  choiceRepository: EntityRepository<Choice>
}

export const DI = {} as DatabaseInfo

export const initDB = async () => {
  DI.orm = await db()
  DI.pollRepository = DI.orm.em.getRepository(Poll)
  DI.choiceRepository = DI.orm.em.getRepository(Choice)
}

initDB()

export default app