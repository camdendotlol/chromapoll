import { MikroORM } from '@mikro-orm/core'
import { EntityManager, EntityRepository } from '@mikro-orm/mongodb'
import express from 'express'
import config from './config'
import dbPool from './db'
import { Poll } from './entities/Poll'
const app = express()

const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  pollRepository: EntityRepository<Poll>
}

(async () => {
  DI.orm = await dbPool()
  DI.pollRepository = DI.orm.em.getRepository(Poll)

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  // Just making sure the ORM works here
  app.get('/:title', async (req, res) => {
    const poll = new Poll(req.params.title)
    try {
      await DI.pollRepository.persistAndFlush(poll)
      console.log(`saved poll called '${poll.title}'`)
      res.status(200).send(`saved poll called '${poll.title}'`)
    } catch(e) {
      res.status(400).send(e.message)
    }
  })

  app.listen(config.PORT, () => {
    console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)
  })
})()
