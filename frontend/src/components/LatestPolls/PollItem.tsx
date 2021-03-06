import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { Choice } from '../../types'
import { isBright, mixColors } from '../lib'

interface Props {
  id: string,
  label: string,
  choices: Choice[]
}

const ListItem = styled.div`
  background: ${props => props.color};
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  transition: 0.2s;

  a:hover, a:focus {
    filter: brightness(110%);
    box-shadow: 3px 3px;
  }

  @media (max-width: ${breakpoints.phone}) {
    min-width: 80vw;
  }
`

const Label = styled.p`
  color: ${props => props.color};
  font-size: 1.1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${breakpoints.phone}) {
    margin-left: 5vw;
    margin-right: 5vw;
  }
`

const PollItem: React.FC<Props> = ({ id, label, choices }) => {
  const choiceColor = mixColors(choices)
  return (
    <Link to={`/poll/${id}`}>
      <ListItem color={choiceColor}>
        <Label color={isBright(choiceColor) ? 'black' : 'white'}>
          {label}
        </Label>
      </ListItem>
    </Link>
  )
}

export default PollItem