import { MikroORM } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb'
import express from 'express'
import config from './config'
import { pollController } from './controllers/poll.controller'
import db from './db'
import { Choice } from './entities/Choice'
import { Poll } from './entities/Poll'

const app = express()

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

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/polls', pollController)

// Catch all remaining requests to nonexisting routes
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }))

app.listen(config.PORT, () => {
  console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)
})

export default app