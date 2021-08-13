import express from 'express'
import { DI } from '../app'
import { Poll } from '../../server/entities/Poll'
import { Choice } from '../../server/entities/Choice'
import { IP } from '../entities/Ip'
import { QueryOrder } from '@mikro-orm/core'

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
    return res.status(404).json({ error: 'Poll not found' })
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

  if (!req.body.title || !req.body.choices) {
    return res.status(400).json('New polls must have a question and answers')
  }

  if (req.body.choices.length < 2) {
    return res.status(400).json('Questions must have at least 2 choices')
  }

  if (req.body.choices.length > 8) {
    return res.status(400).json('Questions are limited to a maximum of 8 choices')
  }

  const choices: Choice[] = []

  const poll = new Poll(req.body.title)

  // Map each choice to its corresponding color
  for (let x = 0; x < req.body.choices.length; x++) {
    if (!req.body.choices[x].name) {
      return res.status(400).json('At least one choice is missing a label')
    }
    if (!req.body.choices[x].color) {
      return res.status(400).json('At least one choice is missing a color')
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
    return res.status(404).json('Poll not found')
  }

  const choice = poll.choices.getItems().find(c => c.id === req.params.cid)

  if (!choice) {
    return res.status(404).json('Choice not found')
  }

  const ip = req.ip

  // TODO: re-enable this once the app ships to production
  // if (poll.voters.getIdentifiers('address').includes(ip)) {
  //   return res.status(400).json('You have already voted in this poll')
  // }

  const ipToSave = new IP(ip)

  poll.voters.add(ipToSave)
  choice.votes = choice.votes += 1

  await em.getRepository(Poll).persistAndFlush(poll)

  return res.status(200).json(poll)
})

export const pollController = router