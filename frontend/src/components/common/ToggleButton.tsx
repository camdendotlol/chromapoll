import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'

interface Props {
  condition: boolean,
  primaryLabel: string,
  secondaryLabel: string,
  callback: (arg0: boolean) => void
}

const Button = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  background-color: ${props => props.color};
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 1rem;
  transition: 0.2s;

  :hover {
    cursor: pointer;
    filter: brightness(80%);
  }
`

const ToggleButton: React.FC<Props> = ({ condition, primaryLabel, secondaryLabel, callback }) => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)
  return (
    <Button
      color={uiColor.light}
      onClick={() => callback(!condition)}
    >
      {condition ? secondaryLabel : primaryLabel}
    </Button>
  )
}

export default ToggleButton