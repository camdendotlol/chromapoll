import { MikroORM  } from '@mikro-orm/core'
import { Poll } from './entities/Poll'
import config from './config'

let orm: MikroORM

export const dbPool = async () => {
  if (orm) {
    return orm
  }
  
  orm = await MikroORM.init({
    entities: [Poll],
    dbName: 'chromapoll',
    type: 'mongo',
    clientUrl: config.DB_URL,
  })

  console.log(`Connected to database at ${config.DB_URL}`);
  return orm
}

export default dbPool