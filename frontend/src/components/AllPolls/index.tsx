import React, { CSSProperties, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllPolls } from '../../reducers/pollReducer'
import PollItem from './PollItem'

const styles: CSSProperties = {
  textAlign: 'center'
}

const AllPolls: React.FC = () => {
  const dispatch = useAppDispatch()

  const polls = useAppSelector(({ polls }) => polls)

  useEffect(() => {
    dispatch(getAllPolls())
  }, [dispatch])

  return (
    <div style={styles}>
      <h1>Latest polls</h1>
      {polls.map(poll => (
        <Link to={`/poll/${poll.id}`} key={poll.id}>
          <PollItem label={poll.title} choices={poll.choices} />
        </Link>
      ))}
    </div>
  )
}

export default AllPolls