import { Connection, IDatabaseDriver, MikroORM  } from '@mikro-orm/core'
import { Poll } from './entities/Poll'
import config from './config'
import { Choice } from './entities/Choice'
import { IP } from './entities/Ip'
import { AsyncLocalStorage } from 'async_hooks'
import { EntityManager } from '@mikro-orm/mongodb'

export const storage = new AsyncLocalStorage<EntityManager>()

const setUpORM = async (): Promise<MikroORM<IDatabaseDriver<Connection>>> => {
  const orm: MikroORM = await MikroORM.init({
    context: () => storage.getStore(),
    entities: [Poll, Choice, IP],
    type: 'mongo',
    clientUrl: config.DB_URL,
    tsNode: true
  })

  // eslint-disable-next-line no-console
  console.log(`Connected to database at ${orm.config.getClientUrl()}`)

  return orm
}

export default setUpORM