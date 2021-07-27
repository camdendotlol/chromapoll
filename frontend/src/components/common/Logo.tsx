import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import logo from '../../public/img/color_wheel.svg'

interface Props {
  size: string
}

const LogoImg = styled.img`
  height: ${props => props.height};
  width: ${props => props.width};

  @media (max-width: ${breakpoints.laptop}) {
    transform: scale(70%);
  }
`

const Logo: React.FC<Props> = ({ size }) => {
  return (
    <LogoImg src={logo} alt='' height={size} width={size} />
  )
}

export default Logo