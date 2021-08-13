import express from 'express'
import { MikroORM } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb'
import cors from 'cors'
import db from './db'
import { Choice } from './entities/Choice'
import { Poll } from './entities/Poll'
import { pollController } from './controllers/poll.controller'
import { IP } from './entities/Ip'

const app = express()
app.use(express.json())
app.use(cors())

interface DatabaseInfo {
  orm: MikroORM,
  em: EntityManager,
  pollRepository: EntityRepository<Poll>,
  choiceRepository: EntityRepository<Choice>,
  IpRepository: EntityRepository<IP>
}

export const DI = {} as DatabaseInfo

export const initDB = async (): Promise<void> => {
  DI.orm = await db()
  DI.pollRepository = DI.orm.em.getRepository(Poll)
  DI.choiceRepository = DI.orm.em.getRepository(Choice)
  DI.IpRepository = DI.orm.em.getRepository(IP)
}

initDB()

app.use('/api/polls', pollController)

// Catch all remaining requests to nonexisting routes
app.use('/api/*', (_req, res) => res.status(404).json({ message: 'Resource not found' }))

export default app