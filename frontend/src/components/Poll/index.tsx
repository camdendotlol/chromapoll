import React, { useEffect, useState } from 'react'
import { ChoiceWithData } from '../../types'
import Circle from './Circle'
import VotePanel from '../VotePanel'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useParams } from 'react-router-dom'
import { getPoll } from '../../reducers/pollReducer'
import styled from 'styled-components'
import { sum, calculateDisplayData } from '../lib'
import ToggleButton from '../common/ToggleButton'
import breakpoints from '../../breakpoints'

const PollDiv = styled.div`
  display: flex;
  gap: 10vw;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 100px;

  @media (max-width: ${breakpoints.phone}) {
    flex-wrap: wrap-reverse;
    margin-top: 20px;
    gap: 10px;
  }
`

// Solution for applying two transform: scale properties at once
const ScalingDiv = styled.div`
  @media (max-width: ${breakpoints.phone}) {
    transform: scale(0.4);
    margin-top: -90px;
  }
`

const Header = styled.h1`
  text-align: center;
  transition: color 0.2s;
  color: ${props => props.color};

  @media (max-width: ${breakpoints.phone}) {
    font-size: 1.2rem;
  }
`

export enum ChartType {
  Chroma,
  Pie
}

const PollPie: React.FC = () => {
  const [showPie, setShowPie] = useState<boolean>(false)
  const [results, setResults] = useState<ChoiceWithData[]>([])

  const { id } = useParams<({ id: string })>()

  const dispatch = useAppDispatch()

  const pollSelector = useAppSelector(({ polls }) => polls)
  const pending = pollSelector.pending
  const poll = pollSelector.polls.find(poll => poll.id === id)
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  useEffect(() => {
    dispatch(getPoll(id))
  }, [id])

  useEffect(() => {
    if (poll?.choices) {
      const calculatedResults = calculateDisplayData(poll.choices)
      setResults(calculatedResults)
    }
  }, [poll?.choices])

  if (pending.singlePoll) {
    return null
  }

  if (!poll) {
    // TODO: nice error screen
    return <p>Poll not found :(</p>
  }

  if (!results || results.length === 0) {
    return null
  }

  // Don't show the pie option if there's nothing useful to show in it
  const handleToggleButton = () => {
    if (results.map(r => r.votes).reduce(sum) < 2) {
      return null
    } else {
      return (
        <ToggleButton
          condition={showPie}
          primaryLabel={'switch to pie'}
          secondaryLabel={'switch to chroma'}
          callback={setShowPie}
        />
      )
    }
  }

  return (
    <>
      <Header color={uiColor.light}>{poll.title}</Header>
      <PollDiv>
        <ScalingDiv>
          <Circle results={results} chartType={showPie ? ChartType.Pie : ChartType.Chroma} />
        </ScalingDiv>
        <div>
          <VotePanel results={results} pollID={poll.id} />
          {handleToggleButton()}
        </div>
      </PollDiv>
    </>
  )
}

export default PollPie