import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'

const FooterText = styled.footer`
  display: block;
  margin: 0 auto;
  text-align: center;
  bottom: 0;
  color: ${props => props.color}
`

const Footer: React.FC = () => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  return <FooterText color={uiColor}>Privacy notice: This website logs IP addresses on polls to ensure data integrity. Your IP address will not be recorded until you vote on a poll.</FooterText>
}

export default Footer