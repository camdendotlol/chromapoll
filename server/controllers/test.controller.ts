import express from 'express'
import { DI } from '../app'
import { Choice } from '../entities/Choice'
import { IP } from '../entities/Ip'
import { Poll } from '../entities/Poll'

const router = express.Router()

router.get('/reset', async (req, res) => {
  const em = DI.orm.em.fork()
  await em.getRepository(Poll).nativeDelete({})
  await em.getRepository(Choice).nativeDelete({})
  await em.getRepository(IP).nativeDelete({})

  return res.status(200).json({ message: 'everything is gone. RIP.' })
})

export const testController = router