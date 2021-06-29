import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllPolls } from '../../reducers/pollReducer'

const AllPolls: React.FC = () => {
  const dispatch = useAppDispatch()

  const polls = useAppSelector(({ polls }) => polls)

  useEffect(() => {
    dispatch(getAllPolls())
  }, [dispatch])

  return (
    <div>
      {polls.map(poll => <p key={poll.id}>{poll.title}</p>)}
    </div>
  )
}

export default AllPolls