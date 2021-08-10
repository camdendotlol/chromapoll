import axios from 'axios'
import { NewPollObject } from '../types'

const baseUrl = '/api/polls'

const getLatestPolls = async () => {
  const res = await axios.get(`${baseUrl}`)
  return res.data
}

const getPoll = async (id: string) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const vote = async (pollID: string, choiceID: string) => {
  const res = await axios.post(`${baseUrl}/vote/${pollID}/${choiceID}`)
  return res.data
}

const createPoll = async (data: NewPollObject) => {
  const res = await axios.post(`${baseUrl}/create`, data)
  return res.data
}

export default {
  getLatestPolls,
  getPoll,
  createPoll,
  vote
}