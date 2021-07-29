import React, { CSSProperties, useEffect, useState } from 'react'
import { ChoiceWithData } from '../../types'
import Circle from './Circle'
import Legend from './Legend'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useParams } from 'react-router-dom'
import { getPoll } from '../../reducers/pollReducer'
import styled from 'styled-components'
import { sum, calculateDisplayData } from '../lib'
import ToggleButton from '../common/ToggleButton'

const pollDivStyles: CSSProperties = {
  display: 'flex',
  gap: '10vw',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const Header = styled.h1`
  text-align: center;
  transition: color 0.2s;
  color: ${props => props.color};
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
  
  useEffect(() => {
    dispatch(getPoll(id))
  }, [id])

  const poll = useAppSelector(({ polls }) => polls.find(p => p.id === id))
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  useEffect(() => {
    if (poll) {
      const calculatedResults = calculateDisplayData(poll.choices)
      setResults(calculatedResults)
    }
  }, [poll])

  if (!poll) {
    // TODO: nice error screen
    // use the loading implementation from Groupread
    return <p>Poll not found :(</p>
  }

  if (!results || results.length === 0) {
    return <p>still loading...</p>
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
      <Header color={uiColor}>{poll.title}</Header>
      <div style={pollDivStyles}>
        <Circle results={results} chartType={showPie ? ChartType.Pie : ChartType.Chroma} />
        <div>
          <Legend results={results} />
          {handleToggleButton()}
        </div>
      </div>
    </>
  )
}

export default PollPie