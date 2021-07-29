import axios from 'axios'

const baseUrl = '/api/polls'

const getAllPolls = async () => {
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

export default {
  getAllPolls,
  getPoll,
  vote
}