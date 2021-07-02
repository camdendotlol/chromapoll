import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'
import { ChoiceWithData } from '../../types'

interface Props {
  results: ChoiceWithData[]
}

const LegendTitle = styled.h3`
  text-align: center;
  margin: 0;
  margin-bottom: 5px;
  color: ${props => props.color}
`

const Label = styled.span`
  color: ${props => props.color}
`

const LegendBox = styled.div`
  border-radius: 5px;
  padding: 20px;
  background: ${props => props.color}
`

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  color: black;
  margin: 0;
`

const Subtitle = styled.span`
  margin-left: 15px;
  font-size: 0.7rem;
  margin-top: 0px;
`

const ChoiceName = styled.span`
  margin-left: 5px;
`

const Legend: React.FC<Props> = ({ results }) => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  const colorKey = (color: string) => (
    <svg width='10' height='10'>
      <rect width='10' height='10' fill={color} />
    </svg>
  )

  return (
    <div>
      <LegendTitle color={uiColor}>Results</LegendTitle>
      <LegendBox color={uiColor}>
        <LegendList>
          {results.map(r =>
            <li key={r.id}>
              {colorKey(r.color)}<ChoiceName><Label color={r.color}>{r.label}</Label>:&nbsp;{`${Math.floor(r.percent * 100) / 100}%`}</ChoiceName>
              <br />
              <Subtitle>{r.votes} votes</Subtitle>
            </li>
            )}
        </LegendList>
      </LegendBox>
    </div>
  )
}

export default Legend