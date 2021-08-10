import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { Choice } from '../../types'
import { mixColors } from '../lib'

interface Props {
  id: string,
  label: string,
  choices: Choice[]
}

const ListDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  align-items: center;
  max-width: ${breakpoints.phone};
  display: flex;
  gap: 10px;
  transition: filter 0.2s;

  a {
    max-width: 80%;
  }

  @media (max-width: ${breakpoints.phone}) {
    max-width: 100vw;
  }
`

const Label = styled.p`
  font-size: 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    filter: brightness(150%);
  }
`

const ColoredCircle = styled.div`
  background-color: ${props => props.color};
  height: 60px;
  width: 60px;
  border-radius: 50%;
  flex-shrink: 0;
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