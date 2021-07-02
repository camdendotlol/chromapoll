import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ChromaLogo from './ChromaLogo'
import breakpoints from '../../breakpoints'
import { useAppSelector } from '../../hooks'

const NavbarDiv = styled.div`
  position: fixed;
  top: 0px;
  background: ${props => props.color}};
  width: 100%;
  margin: 0;
  z-index: 1000;
  box-shadow: 0 0 3px #4e4a4a;
  transition: background 0.2s;
`

const NavbarContent = styled.div`
  width: 60%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;

  a{
    text-decoration: none;
  }

  @media(max-width: ${breakpoints.laptop}) {
    width: 100%;
  }
`

const Navbar: React.FC = () => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  const pickColor = () => {
    if (uiColor === 'rgb(233, 233, 233)') {
      return '#4c4e52'
    } else {
      return uiColor
    }
  }

  return (
    <NavbarDiv color={pickColor()}>
      <NavbarContent>
        <Link to='/'><ChromaLogo /></Link>
      </NavbarContent>
    </NavbarDiv>
  )
}

export default Navbar