import React from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { vote } from '../../reducers/pollReducer'
import { ChoiceWithData } from '../../types'
import CuteTable from '../common/CuteTable'

interface Props {
  results: ChoiceWithData[],
  pollID: string
}

const LegendTitle = styled.h3`
  text-align: center;
  margin: 0;
  margin-bottom: 5px;
  color: ${props => props.color}
`

const VotePanel: React.FC<Props> = ({ results, pollID }) => {
  const dispatch = useAppDispatch()
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  const handleVote = async (choiceID: string) => {
    await dispatch(vote({ pollID, choiceID }))
  }

  const displayPercentage = (percentage: number) => {
    return `${Math.round(percentage * 10) / 10}%`
  }

  const getTableItems = (result: ChoiceWithData) => {
    return {
      color: result.color,
      properties: [
        result.label,
        result.votes.toString(),
        displayPercentage(result.percent)
      ],
      callback: () => handleVote(result.id)
    }
  }

  return (
    <div>
      <LegendTitle
        color={uiColor.light}
      >
        Results
      </LegendTitle>
      <CuteTable
        items={results.map(r => getTableItems(r))}
      />
    </div>
  )
}

export default VotePanel