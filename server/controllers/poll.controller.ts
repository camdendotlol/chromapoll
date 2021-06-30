import express from 'express'
import { DI } from '../app'
import { Poll } from '../../server/entities/Poll'
import { Choice } from '../../server/entities/Choice'
import { getColors } from './lib'
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
//   title: 'What\'s your favorite color?'
//   choices: [
//     'red',
//     'green',
//     'blue'
//   ]
// }

router.post('/create', async (req, res) => {
  if (!req.body.title || !req.body.choices) {
    return res.status(400).json('New polls must have a question and answers')
  }

  if (req.body.choices.length <= 1) {
    return res.status(400).json('Questions must have at least two choices')
  }

  const poll = new Poll(req.body.title)
  const colors = getColors(req.body.choices.length)
  const choices = req.body.choices

  // Map each choice to its corresponding color
  for (let i = 0; i < choices.length; i++) {
    choices[i] = new Choice(choices[i], colors[i], poll)
  }

  poll.choices = choices

  await DI.pollRepository.persistAndFlush(poll)

  return res.status(200).json(poll)
})

router.post('/vote/:id', async (req, res) => {
  const choice = await DI.choiceRepository.findOne(req.params.id)
  const ip = req.ip

  if (!choice) {
    return res.status(404).json('Choice not found')
  }

  if (choice.voters.find(v => v.address === ip)) {
    return res.status(400).json('You have already voted in this poll')
  }

  const ipToSave = new IP(ip)

  choice.votes = choice.votes += 1
  await DI.pollRepository.persistAndFlush(choice)
  await DI.IpRepository.persistAndFlush(ipToSave)

  return res.status(200).json(choice)
})

export const pollController = router