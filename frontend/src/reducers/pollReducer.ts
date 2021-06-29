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

const pollSlice = createSlice({
  name: 'pollSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPolls.fulfilled, (state, { payload }) => {
      return state = payload
    })
  }
})

export default pollSlice.reducer
export const pollSelector = (state: { pollStore: Poll[] }): Poll[] => state.pollStore