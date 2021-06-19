import { MikroORM } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb'
import express from 'express'
import config from './config'
import { pollController } from './controllers/poll.controller'
import dbPool from './db'
import { Choice } from './entities/Choice'
import { Poll } from './entities/Poll'
const app = express()

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  pollRepository: EntityRepository<Poll>,
  choiceRepository: EntityRepository<Choice>
}

(async () => {
  DI.orm = await dbPool()
  DI.pollRepository = DI.orm.em.getRepository(Poll)
  DI.choiceRepository = DI.orm.em.getRepository(Choice)

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use('/polls', pollController)

  app.listen(config.PORT, () => {
    console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)
  })
})()
