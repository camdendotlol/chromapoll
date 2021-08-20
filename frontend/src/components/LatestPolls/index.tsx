import React, { useEffect, useState } from 'react'
import { animated, useTrail } from 'react-spring'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { getLatestPolls } from '../../reducers/pollReducer'
import { Poll } from '../../types'
import { CenteredHeader } from '../common/styledComponents'
import PollItem from './PollItem'

const PollList = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  
  a {
    outline: none;
  }

  a:hover div, a:focus div {
    filter: brightness(110%);
    box-shadow: 3px 3px;
  }

  @media (max-width: ${breakpoints.phone}) {
    gap: 20px;
  }
`

const LatestPolls: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = 'Chromapoll - Latest Polls'
  }, [])

  const trail = useTrail(polls.length, {
    from: { opacity: 0, scale: 0.2 },
    to: { opacity: 1, scale: 1 },
    config: {
      mass: 1,
      tension: 210,
      friction: 20
    }
  })

  const pollsSelector = useAppSelector(({ polls }) => polls)

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])
  
  useEffect(() => {
    // When the user navigates directly to a poll page and then comes to the
    // latest poll page, there will briefly be only one poll in state. Wait
    // until recieving the rest of the polls before displaying to avoid a
    // single poll flashing on the screen for a split second.
    if (pollsSelector.polls.length > 1) {
      setPolls(pollsSelector.polls)
    }
  }, [pollsSelector.polls])

  useEffect(() => {
    dispatch(getLatestPolls())
  }, [dispatch])

  if (pollsSelector.pending.latestPolls) {
    return null
  }

  return (
    <>
      <CenteredHeader>Latest polls</CenteredHeader>
      <PollList>
        {trail.map((style, i) => (
          <animated.div style={style} key={i}>
            <PollItem
              key={polls[i].id}
              id={polls[i].id}
              label={polls[i].title}
              choices={polls[i].choices}
            />
          </animated.div>
        ))}
      </PollList>
    </>
  )
}

export default LatestPolls