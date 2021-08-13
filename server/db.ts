import { MikroORM  } from '@mikro-orm/core'
import { Poll } from './entities/Poll'
import config from './config'
import { Choice } from './entities/Choice'
import { IP } from './entities/Ip'
import { AsyncLocalStorage } from 'async_hooks'
import { EntityManager } from '@mikro-orm/mongodb'

export const storage = new AsyncLocalStorage<EntityManager>()

const setUpORM = async () => {
  const orm: MikroORM = await MikroORM.init({
    context: () => storage.getStore(),
    entities: [Poll, Choice, IP],
    dbName: 'chromapoll',
    type: 'mongo',
    clientUrl: config.DB_URL,
    tsNode: true
  })

  console.log(`Connected to database at ${config.DB_URL}`);

  return orm
}

export default setUpORM