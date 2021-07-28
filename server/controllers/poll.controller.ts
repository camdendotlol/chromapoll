import express from 'express'
import { DI } from '../app'
import { Poll } from '../../server/entities/Poll'
import { Choice } from '../../server/entities/Choice'
import { IP } from '../entities/Ip'

const router = express.Router()

router.get('/', async (req, res) => {
  const polls = await DI.pollRepository.findAll(['choices'])
  res.json(polls)
})

router.get('/:id', async (req, res) => {
  const poll = await DI.pollRepository.findOne(req.params.id, ['choices'])
  if (!poll) {
    res.status(404).json({ error: 'Poll not found' })
  }
  res.status(200).json(poll)
})

// EXAMPLE NEW POLL REQUEST BODY:
// {
//   title: 'What\'s your favorite animal?'
//   choices: [
// {
//   "name": "Rabbit",
//     "color": "#ff0000"
// },
// {
//   "name": "Horse",
//     "color": "#008000"
// },
// {
//   "name": "Frog",
//     "color": "#0000ff"
// }
//   ]
// }

router.post('/create', async (req, res) => {
  if (!req.body.title || !req.body.choices) {
    return res.status(400).json('New polls must have a question and answers')
  }

  if (req.body.choices.length <= 1) {
    return res.status(400).json('Questions must have at least two choices')
  }

  const choices: Choice[] = []

  const poll = new Poll(req.body.title)

  // Map each choice to its corresponding color
  for (let x = 0; x < req.body.choices.length; x++) {
    if (!req.body.choices[x].color) {
      return res.status(400).json('At least one choice is missing a color')
    }

    choices.push(new Choice(req.body.choices[x], req.body.choices[x].color, poll))
  }

  await DI.pollRepository.persistAndFlush(poll)

  return res.status(200).json(poll)
})

// Vote on a poll
router.post('/vote/:pid/:cid', async (req, res) => {
  const poll = await DI.pollRepository.findOne(req.params.pid, ['choices', 'voters'])

  if (!poll) {
    return res.status(404).json('Poll not found')
  }

  const choice = poll.choices.getItems().find(c => c.id === req.params.cid)

  if (!choice) {
    return res.status(404).json('Choice not found')
  }

  const ip = req.ip

  if (poll.voters.getIdentifiers('address').includes(ip)) {
    return res.status(400).json('You have already voted in this poll')
  }

  const ipToSave = new IP(ip)

  poll.voters.add(ipToSave)
  choice.votes = choice.votes += 1

  await DI.pollRepository.persistAndFlush(poll)

  return res.status(200).json(poll)
})

export const pollController = router