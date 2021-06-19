import express from 'express'
import { DI } from '../index'
import { Poll } from '../entities/Poll'
import { Choice } from '../entities/Choice'

const router = express.Router()

router.get('/', async (req, res) => {
  const polls = await DI.pollRepository.findAll()
  res.json(polls)
})

router.get('/choices', async (req, res) => {
  const choices = await DI.choiceRepository.findAll()
  res.status(200).json(choices)
})

router.get('/:id', async (req, res) => {
  const poll = await DI.pollRepository.findOne(req.params.id, ['choices'])
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

  if (req.body.choices.length < 1) {
    return res.status(400).json('Questions must have at least two choices')
  }

  const poll = new Poll(req.body.title)

  const choices = req.body.choices.map((c: string) => new Choice(c, poll))

  poll.choices = choices

  await DI.pollRepository.persistAndFlush(poll)
})

export const pollController = router