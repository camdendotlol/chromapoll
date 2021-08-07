import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import pollService from '../services/polls'
import { NewPollObject, Poll } from '../types'

const initialState: Poll[] = []

interface VotePayload {
  pollID: string,
  choiceID: string
}

export const getAllPolls = createAsyncThunk(
  '/getAllPollsStatus',
  async () => {
    const polls = await pollService.getAllPolls()
    return polls
  }
)

export const getPoll = createAsyncThunk(
  '/getPollStatus',
  async (id: string) => {
    const poll = await pollService.getPoll(id)
    if (poll) {
      return poll
    }
  }
)

export const createPoll = createAsyncThunk(
  '/createPollStatus',
  async (payload: NewPollObject) => {
    let res
    try {
      res = await pollService.createPoll(payload)
    } catch(e) {
      throw new Error(e.message)
    }
    return res
  }
)

export const vote = createAsyncThunk(
  '/voteStatus',
  async (payload: VotePayload) => {
    const res = await pollService.vote(payload.pollID, payload.choiceID)
    return res
  }
)

const pollSlice = createSlice({
  name: 'pollSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPolls.fulfilled, (state, { payload }) => {
      return payload
    }),
    builder.addCase(getPoll.fulfilled, (state, { payload }) => {
      if (state.find(p => p.id === payload.id)) {
        return state
      }
      return [...state, payload]
    }),
    builder.addCase(createPoll.fulfilled, (state, { payload }) => {
      return [...state, payload]
    })
    builder.addCase(vote.fulfilled, (state, { payload }) => {
      return state.map(poll => poll.id === payload.id ? payload : poll)
    })
  }
})

export default pollSlice.reducer
export const pollSelector = (state: { pollStore: Poll[] }): Poll[] => state.pollStore