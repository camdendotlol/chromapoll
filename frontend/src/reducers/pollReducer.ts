import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import pollService from '../services/polls'
import { Poll } from '../types'

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
      return state = payload
    }),
    builder.addCase(getPoll.fulfilled, (state, { payload }) => {
      if (state.find(p => p.id === payload.id)) {
        return state = state
      }
      return state = [...state, payload]
    }),
    builder.addCase(vote.fulfilled, (state, { payload }) => {
      return state = state.map(poll => poll.id === payload.id ? payload : poll)
    })
  }
})

export default pollSlice.reducer
export const pollSelector = (state: { pollStore: Poll[] }): Poll[] => state.pollStore