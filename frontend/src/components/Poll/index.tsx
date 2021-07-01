import React, { CSSProperties, useEffect, useState } from 'react'
import { ChoiceWithData } from '../../types'
import Circle from './Circle'
import Legend from './Legend'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useParams } from 'react-router-dom'
import { getPoll } from '../../reducers/pollReducer'
import styled from 'styled-components'
import { getPercentages } from '../lib'

const pollDivStyles: CSSProperties = {
  display: 'flex',
  gap: '10vw',
  height: '70vh',
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

const PollSwitchButton = styled.button`
  display: block;
  margin: 0 auto;
`

export enum ChartType {
  Chroma,
  Pie
}

const PollPie: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>(ChartType.Chroma)
  const [results, setResults] = useState<ChoiceWithData[]>([])

  const { id } = useParams<({ id: string })>()

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getPoll(id))
  }, [id])

  const poll = useAppSelector(({ polls }) => polls.find(p => p.id === id))
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  useEffect(() => {
    // The ballot stuffing is temporary for early development
    if (poll) {
      setResults(poll.choices.map(c => c = { ...c, votes: Math.floor(Math.random() * 1000) }) as ChoiceWithData[])
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

  const handleButton = () => {
    switch(chartType) {
      case ChartType.Chroma:
        return <PollSwitchButton onClick={() => setChartType(ChartType.Pie)}>switch to pie</PollSwitchButton>
      case ChartType.Pie:
        return <PollSwitchButton onClick={() => setChartType(ChartType.Chroma)}>switch to chroma</PollSwitchButton>
    }
  }

  const calculatedResults = getPercentages(results)

  return (
    <div>
      <Header color={uiColor}>{poll.title}</Header>
      {handleButton()}
      <div style={pollDivStyles}>
        <Circle results={calculatedResults} chartType={chartType} />
        <Legend results={calculatedResults} />
      </div>
    </div>
  )
}

export default PollPie