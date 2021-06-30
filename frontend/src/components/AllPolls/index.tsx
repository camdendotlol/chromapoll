import React, { CSSProperties, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllPolls } from '../../reducers/pollReducer'

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
      {polls.map(poll => <p key={poll.id}><Link to={`/poll/${poll.id}`}>{poll.title}</Link></p>)}
    </div>
  )
}

export default AllPolls