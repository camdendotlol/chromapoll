import React, { CSSProperties, useEffect } from 'react'
import { Choice, ChoiceWithData } from '../../types'
import AnimatedChart from './AnimatedChart'
import Legend from './Legend'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useParams } from 'react-router-dom'
import { getPoll } from '../../reducers/pollReducer'
import styled from 'styled-components'

const getPercentages = (resultsArray: Choice[]) => {
  const reducer = (a: number, b: number) => a + b
  const total = resultsArray.map(r => r.votes).reduce(reducer)

  const sortedResults = resultsArray.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    } if (a.votes < b.votes) {
      return 1
    } else {
      return 0
    }
  }) as ChoiceWithData[]

  const resultsWithPercent = sortedResults.map(r => r = {
    ...r,
    percent: (r.votes / total) * 100
  })

  return resultsWithPercent.map((r, index) => r = {
    ...r,
    offset: index === 0 ? 0 : index === 1 ? resultsWithPercent[0].percent : resultsWithPercent.slice(0, index).map(r => r.percent).reduce(reducer)
  })
}

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
    text-align: center
`

const PollPie: React.FC = () => {
  const { id } = useParams<({ id: string })>()

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getPoll(id))
  }, [id])

  const poll = useAppSelector(({ polls }) => polls.find(p => p.id === id))

  if (!poll) {
    // TODO: nice error screen
    // use the loading implementation from Groupread
    return <p>Poll not found :(</p>
  }

  // The ballot stuffing is temporary for early development
  const pollWithFakeResults: Choice[] = poll.choices.map(
    c => c = { ...c, votes: Math.floor(Math.random() * 1000) }
  )

  const calculatedResults = getPercentages(pollWithFakeResults)

  return (
    <div>
      <Header>{poll.title}</Header>
      <div style={pollDivStyles}>
        <AnimatedChart results={calculatedResults}/>
        <Legend results={calculatedResults} />
      </div>
    </div>
  )
}

export default PollPie