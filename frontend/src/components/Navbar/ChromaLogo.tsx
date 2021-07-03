import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'
import colorWheel from '../../public/img/color_wheel.svg'

const LogoDiv = styled.div`
  display: flex;
  flex-flow: row;
  text-decoration: none;
  align-items: center;
  padding: 2px;
  border-radius: 5px;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

const Logo = styled.img`
  height: 24px;
  width: 24px;
  src: ${props => props.src};
`

const LogoText = styled.p`
  fontWeight: 1000;
  font-size: 1.5rem;
  margin: 0;
  padding-left: 10px; 
  display: inline-block;
  color: ${props => props.color};
  transition: color 0.2s;
`

const ChromaLogo: React.FC = () => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  const getColor = () => {
    if (uiColor === 'rgb(233, 233, 233)') {
      return '#e9e9e9'
    } else {
      return '#202020'
    }
  }

  return (
    <LogoDiv>
      <Logo src={colorWheel} />
      <LogoText color={getColor()}>Chromapoll</LogoText>
    </LogoDiv>
  )
}

export default ChromaLogo