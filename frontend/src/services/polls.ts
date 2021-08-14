/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  const res = await axios({
    url: `${baseUrl}/vote/${pollID}/${choiceID}`,
    method: 'post',
    validateStatus: status => [200, 400, 401, 404].includes(status)
  })

  if (res.status >= 400 && res.status <= 404) {
    console.log(res.data)
    throw new Error(res.data.error)
  }

  return res.data
}

const createPoll = async (data: NewPollObject) => {
  const res = await axios({
    url: `${baseUrl}/create`,
    method: 'post',
    data: data,
    validateStatus: status => [200, 400, 401, 404].includes(status)
  })

  if (res.status >= 400 && res.status <= 404) {
    throw new Error(res.data.error)
  }

  return res.data
}

export default {
  getLatestPolls,
  getPoll,
  createPoll,
  vote
}