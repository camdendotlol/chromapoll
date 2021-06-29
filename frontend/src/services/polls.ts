import axios from 'axios'

const baseUrl = '/api/polls'

const getAllPolls = async () => {
  const res = await axios.get(`${baseUrl}`)
  return res.data
}

export default {
  getAllPolls
}