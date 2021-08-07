import React, { CSSProperties, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { getAllPolls } from '../../reducers/pollReducer'
import PollItem from './PollItem'

const styles: CSSProperties = {
  textAlign: 'center',
  margin: '0 auto'
}

const AllPolls: React.FC = () => {
  const dispatch = useAppDispatch()

  const polls = useAppSelector(({ polls }) => polls)

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])

  useEffect(() => {
    dispatch(getAllPolls())
  }, [dispatch])

  return (
    <div style={styles}>
      <h1>Latest polls</h1>
      {polls.map(poll => (
        <PollItem
          key={poll.id}
          id={poll.id}
          label={poll.title}
          choices={poll.choices}
        />
      ))}
    </div>
  )
}

export default AllPolls