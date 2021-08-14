import { configureStore } from '@reduxjs/toolkit'
import colorReducer from './reducers/colorReducer'
import errorReducer from './reducers/errorReducer'
import pollReducer from './reducers/pollReducer'

const store = configureStore({
  reducer: {
    polls: pollReducer,
    uiColor: colorReducer,
    error: errorReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store