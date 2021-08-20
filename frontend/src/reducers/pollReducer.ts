import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import errorMessages from '../errorMessages'

import pollService from '../services/polls'
import { NewPollObject, Poll } from '../types'
import { checkIfAlreadyVoted } from './lib'

interface PollState {
  pending: {
    latestPolls: boolean,
    singlePoll: boolean,
    createPoll: boolean,
    vote: boolean
  },
  polls: Poll[]
}

// Start with all true so 404 errors don't pop up before dispatches go through
const initialState: PollState = {
  pending: {
    latestPolls: true,
    singlePoll: true,
    createPoll: true,
    vote: true
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
    // the client remembers which polls the user has already voted in
    if (checkIfAlreadyVoted(payload.pollID)) {
      throw new Error(errorMessages.AlreadyVoted)
    }

    try {
      const res = await pollService.vote(payload.pollID, payload.choiceID)
      return res
    } catch(e) {
      // add it to the localstorage so the client remembers next time 😤
      if (e.message === errorMessages.AlreadyVoted) {
        const votedIn = JSON.parse(localStorage.getItem('votedIn') || '[]')
        votedIn.push(payload.pollID)
        localStorage.setItem('votedIn', JSON.stringify(votedIn))
      }

      throw new Error(e.message)
    }
  }
)

const pollSlice = createSlice({
  name: 'pollSlice',
  initialState,
  reducers: {
    updateVoteTotals(state, { payload }) {
      return {
        ...state,
        polls: state.polls.map(poll => {
          if (poll.id === payload.id) {
            return {
              ...poll,
              choices: payload.choices
            }
          } else {
            return poll
          }
        })
      }
    }
  },
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
    builder.addCase(createPoll.rejected, (state, { error }) => {
      throw new Error(error.message)
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
      // Add the poll to the client-side list of polls the person has voted in
      const votedIn = JSON.parse(localStorage.getItem('votedIn') || '[]')
      votedIn.push(payload.id)
      localStorage.setItem('votedIn', JSON.stringify(votedIn))

      return {
        pending: {
          ...state.pending,
          vote: false
        },
        polls: state.polls.map(poll => poll.id === payload.id ? payload : poll)
      }
    }),
    builder.addCase(vote.rejected, (_state, { error }) => {
      throw new Error(error.message)
    })
  }
})

export const { updateVoteTotals } = pollSlice.actions
export default pollSlice.reducer
export const pollSelector = (state: { pollStore: Poll[] }): Poll[] => state.pollStore