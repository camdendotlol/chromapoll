import React from 'react'
import styled from 'styled-components'
import errorMessages from '../../../errorMessages'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import { setErrorMessage } from '../../../reducers/errorReducer'
import { vote } from '../../../reducers/pollReducer'
import { ChoiceWithData } from '../../../types'
import CuteTable from '../../common/CuteTable'

interface Props {
  results: ChoiceWithData[],
  pollID: string,
  hasVoted: boolean,
  setHasVoted: (arg: boolean) => void
}

const LegendTitle = styled.h3`
  text-align: center;
  margin: 0;
  margin-bottom: 5px;
  color: ${props => props.color}
`

const VotePanel: React.FC<Props> = ({ results, pollID, hasVoted, setHasVoted }) => {
  const dispatch = useAppDispatch()
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  const handleVote = async (choiceID: string) => {
    try {
      await dispatch(vote({ pollID, choiceID }))
    } catch(e) {
      if (e.message === errorMessages.AlreadyVoted) {
        setHasVoted(true)
      }
      dispatch(setErrorMessage(e.message))
    }
  }

  const displayPercentage = (percentage: number) => {
    return `${Math.round(percentage * 10) / 10}%`
  }

  const getTableItems = (choice: ChoiceWithData) => {
    if (hasVoted) {
      return {
        color: choice.color,
        properties: [
          choice.label,
          choice.votes.toString(),
          displayPercentage(choice.percent)
        ]
      }
    } else {
      return {
        color: choice.color,
        properties: [
          choice.label
        ],
        callback: () => handleVote(choice.id)
      }
    }
  }

  return (
    <div>
      <LegendTitle
        color={uiColor.light}
      >
        { hasVoted ? 'Results' : 'Choices' }
      </LegendTitle>
      <div
        id='vote-box'
      >
        <CuteTable
          items={results.map(r => getTableItems(r))}
        />
      </div>
    </div>
  )
}

export default VotePanel