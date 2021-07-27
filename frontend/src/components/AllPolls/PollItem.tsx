import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { Choice } from '../../types'
import { mixColors } from '../lib'

interface Props {
  label: string,
  choices: Choice[]
}

const ListDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Label = styled.p`
  font-size: 1.2em;
`

const ColoredCircle = styled.span`
  background-color: ${props => props.color};
  height: 60px;
  width: 60px;
  border-radius: 50%;
`

const PollItem: React.FC<Props> = ({ label, choices }) => {
  return (
    <ListDiv>
      <ColoredCircle color={mixColors(choices)} />
      <Label>{label}</Label>
    </ListDiv>
  )
}

export default PollItem