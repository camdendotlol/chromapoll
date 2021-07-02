import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'
import colorWheel from '../../public/img/color_wheel.svg'

const LogoDiv = styled.div`
  display: flex;
  flex-flow: row;
  text-decoration: none;
  align-items: center;
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
  color: black;
  fitler: invert(50%);
`

const ChromaLogo: React.FC = () => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  return (
    <LogoDiv>
      <Logo src={colorWheel} />
      <LogoText color={uiColor}>Chromapoll</LogoText>
    </LogoDiv>
  )
}

export default ChromaLogo