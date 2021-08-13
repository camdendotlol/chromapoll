import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import pollService from '../services/polls'
import { NewPollObject, Poll } from '../types'

interface PollState {
  pending: {
    latestPolls: boolean,
    singlePoll: boolean,
    createPoll: boolean,
    vote: boolean
  },
  polls: Poll[]
}

const initialState: PollState = {
  pending: {
    latestPolls: false,
    singlePoll: false,
    createPoll: false,
    vote: false
  },
  polls: [] as Poll[]
}

interface VotePayload {
  pollID: string,
  choiceID: string
}

export const getLatestPolls = createAsyncThunk(
  '/getLatestPollsStatus',
  async () => {
    const polls = await pollService.getLatestPolls()
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
    builder.addCase(getLatestPolls.pending, (state) => {
      return {
        pending: {
          ...state.pending,
          latestPolls: true
        },
        polls: state.polls
      }
    }),
    builder.addCase(getLatestPolls.rejected, (state) => {
      return {
        pending: {
          ...state.pending,
          latestPolls: false
        },
        polls: state.polls
      }
    }),
    builder.addCase(getLatestPolls.fulfilled, (state, { payload }) => {
      return {
        pending: {
          ...state.pending,
          latestPolls: false
        },
        polls: payload
      }
    }),
    builder.addCase(getPoll.pending, (state) => {
      return {
        pending: {
          ...state.pending,
          singlePoll: true
        },
        polls: state.polls
      }
    }),
    builder.addCase(getPoll.rejected, (state) => {
      return {
        pending: {
          ...state.pending,
          singlePoll: false
        },
        polls: state.polls
      }
    }),
    builder.addCase(getPoll.fulfilled, (state, { payload }) => {
      if (state.polls.find(p => p.id === payload.id)) {
        return {
          pending: {
            ...state.pending,
            singlePoll: false
          },
          polls: state.polls
        }
      }
      return {
        pending: {
          ...state.pending,
          singlePoll: false
        },
        polls: [...state.polls, payload ]
      }
    }),
    builder.addCase(createPoll.pending, (state) => {
      return {
        pending: {
          ...state.pending,
          createPoll: true
        },
        polls: state.polls
      }
    }),
    builder.addCase(createPoll.rejected, (state) => {
      return {
        pending: {
          ...state.pending,
          createPoll: false
        },
        polls: state.polls
      }
    }),
    builder.addCase(createPoll.fulfilled, (state, { payload }) => {
      return {
        pending: {
          ...state.pending,
          createPoll: false
        },
        polls: [...state.polls, payload]
      }
    }),
    builder.addCase(vote.fulfilled, (state, { payload }) => {
      return {
        pending: {
          ...state.pending,
          vote: false
        },
        polls: state.polls.map(poll => poll.id === payload.id ? payload : poll)
      }
    })
  }
})

export default pollSlice.reducer
export const pollSelector = (state: { pollStore: Poll[] }): Poll[] => state.pollStore