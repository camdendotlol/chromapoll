import { MikroORM  } from '@mikro-orm/core'
import { Poll } from './entities/Poll'
import config from './config'
import { Choice } from './entities/Choice'
import { IP } from './entities/Ip'

let orm: MikroORM

const dbPool = async () => {  
  if (orm) {
    return orm
  }

  orm = await MikroORM.init({
    entities: [Poll, Choice, IP],
    dbName: 'chromapoll',
    type: 'mongo',
    clientUrl: config.DB_URL,
    tsNode: true
  })

  console.log(`Connected to database at ${config.DB_URL}`);
  return orm
}

export default dbPool