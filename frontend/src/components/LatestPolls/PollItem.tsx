import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Choice } from '../../types'
import { mixColors } from '../lib'

interface Props {
  id: string,
  label: string,
  choices: Choice[]
}

const ListDiv = styled.div`
  display: inline-flex;
  margin: 0 auto;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: filter 0.2s;
`

const Label = styled.span`
  display: inline-block;
  font-size: 1.2em;
  max-width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    filter: brightness(150%);
  }
`

const ColoredCircle = styled.span`
  display: inline-block;
  background-color: ${props => props.color};
  height: 60px;
  width: 60px;
  border-radius: 50%;
`

const PollItem: React.FC<Props> = ({ id, label, choices }) => {
  return (
    <ListDiv>
      <ColoredCircle color={mixColors(choices)} />
      <Link to={`/poll/${id}`}>
        <Label>{label}</Label>
      </Link>
    </ListDiv>
  )
}

export default PollItem