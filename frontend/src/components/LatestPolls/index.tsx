import React, { useEffect } from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { getLatestPolls } from '../../reducers/pollReducer'
import { CenteredHeader } from '../common/styledComponents'
import PollItem from './PollItem'

const PollList = styled.div`
  width: ${breakpoints.phone};
  margin: 0 auto;

  @media (max-width ${breakpoints.phone}) {
    width: calc(100vw - 20px);
  }
`

const LatestPolls: React.FC = () => {
  const dispatch = useAppDispatch()

  const polls = useAppSelector(({ polls }) => polls)

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])

  useEffect(() => {
    dispatch(getLatestPolls())
  }, [dispatch])

  return (
    <>
      <CenteredHeader>Latest polls</CenteredHeader>
      <PollList>
        {polls.map(poll => (
          <PollItem
            key={poll.id}
            id={poll.id}
            label={poll.title}
            choices={poll.choices}
          />
        ))}
      </PollList>
    </>
  )
}

export default LatestPolls