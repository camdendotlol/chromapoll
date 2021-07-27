import React from 'react'
import styled from 'styled-components'
import logo from '../../public/img/color_wheel.svg'

interface Props {
  size: string
}

const LogoImg = styled.img`
  height: ${props => props.height};
  width: ${props => props.width};
`

const Logo: React.FC<Props> = ({ size }) => {
  return (
    <img src={logo} alt='' height={size} width={size} />
  )
}

export default Logo