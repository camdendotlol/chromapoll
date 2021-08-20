import express from 'express'
import { DI } from '../app'
import { Poll } from '../../server/entities/Poll'
import { Choice } from '../../server/entities/Choice'
import { IP } from '../entities/Ip'
import { QueryOrder } from '@mikro-orm/core'
import errorMessages from './errorMessages'
import { socketClients, wsSocket } from '../socket'

const router = express.Router()

router.get('/', async (req, res) => {
  const em = DI.orm.em.fork()
  const polls = await em.getRepository(Poll).findAll({
    orderBy: { createdAt: QueryOrder.DESC },
    populate: ['choices'],
    limit: 50
  })
  return res.json(polls)
})

router.get('/:id', async (req, res) => {
  const em = DI.orm.em.fork()
  const poll = await em.getRepository(Poll).findOne(req.params.id, ['choices'])
  if (!poll) {
    return res.status(404).json({ error: errorMessages.NotFound('Poll') })
  }
  return res.status(200).json(poll)
})

// EXAMPLE NEW POLL REQUEST BODY:
// {
//   title: "What's your favorite animal?""
//   "choices": [
//     {
//       "name": "Rabbit",
//       "color": "#ff0000"
//     },
//     {
//       "name": "Horse",
//       "color": "#008000"
//     },
//     {
//       "name": "Frog",
//       "color": "#0000ff"
//     }
//   ]
// }

router.post('/create', async (req, res) => {
  const em = DI.orm.em.fork()

  if (!req.body.title) {
    return res.status(400).json({ error: errorMessages.MissingTitle})
  }

  if (req.body.title.length > 64) {
    return res.status(400).json({ error: errorMessages.TooLong('Titles', 64)})
  }

  if (!req.body.choices || req.body.choices.length < 2) {
    return res.status(400).json({ error: errorMessages.MissingChoices })
  }

  if (req.body.choices.length > 8) {
    return res.status(400).json({ error: errorMessages.TooManyChoices })
  }

  const choices: Choice[] = []

  const poll = new Poll(req.body.title)

  // Map each choice to its corresponding color
  for (let x = 0; x < req.body.choices.length; x++) {
    if (!req.body.choices[x].name) {
      return res.status(400).json({ error: errorMessages.MissingLabel })
    }
    if (!req.body.choices[x].color) {
      return res.status(400).json({ error: errorMessages.MissingColor })
    }
    if (req.body.choices[x].name.length > 32) {
      return res.status(400).json({ error: errorMessages.TooLong('Choices', 32) })
    }
    if (!/^#[A-Fa-f0-9]{6}$/.test(req.body.choices[x].color)) {
      return res.status(400).json({ error: errorMessages.BadHexCode })
    }

    choices.push(new Choice(
      req.body.choices[x].name,
      req.body.choices[x].color,
      poll
    ))
  }

  await em.getRepository(Poll).persistAndFlush(poll)

  return res.status(200).json({ ...poll, choices: choices })
})

// Vote on a poll
router.post('/vote/:pid/:cid', async (req, res) => {
  const em = DI.orm.em.fork()
  const poll = await em.getRepository(Poll).findOne(req.params.pid, ['choices', 'voters'])

  if (!poll) {
    return res.status(404).json({ error: errorMessages.NotFound('Poll') })
  }

  const choice = poll.choices.getItems().find(c => c.id === req.params.cid)

  if (!choice) {
    return res.status(404).json({ error: errorMessages.NotFound('Choice') })
  }

  // TODO: enable once development finishes
  const ip = req.ip

  if (poll.voters.getIdentifiers('address').includes(ip)) {
    return res.status(400).json({ error: errorMessages.AlreadyVoted })
  }

  const ipInDB = await em.getRepository(IP).findOne({ address: ip })

  if (ipInDB) {
    poll.voters.add(ipInDB)
  } else {
    poll.voters.add(new IP(ip))
  }

  choice.votes = choice.votes += 1

  await em.getRepository(Poll).persistAndFlush(poll)

  const socketWatchers = socketClients.filter(client => client.pollID === poll.id && client.active)

  socketWatchers.forEach(client => {
    client.socket.send(JSON.stringify(poll.choices))
  })

  return res.status(200).json(poll)
})

export const pollController = router