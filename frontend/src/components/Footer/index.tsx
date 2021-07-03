import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { useAppSelector } from '../../hooks'

const FooterDiv = styled.footer`
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  color: ${props => props.color};
  transition: color 0.2s;

  @media(max-width: ${breakpoints.laptop}) {
    font-size: 0.8rem;
  }
`

const Footer: React.FC = () => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  return <FooterDiv color={uiColor}><p>Privacy notice: This website logs IP addresses on polls to ensure data integrity. Your IP address will not be recorded until you vote on a poll.</p></FooterDiv>
}

export default Footer