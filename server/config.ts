import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

let DB_URL: string

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line no-console
  console.log('running in test mode')
  DB_URL = process.env.TEST_DB_URL || ''
} else {
  DB_URL = process.env.DB_URL || ''
}

export default {
  PORT,
  DB_URL
}