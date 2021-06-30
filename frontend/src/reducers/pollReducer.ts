import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import pollService from '../services/polls'
import { Poll } from '../types'

const initialState: Poll[] = []

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
    })
  }
})

export default pollSlice.reducer
export const pollSelector = (state: { pollStore: Poll[] }): Poll[] => state.pollStore