import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ChromaLogo from './ChromaLogo'
import breakpoints from '../../breakpoints'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { getTextColor } from '../lib'

const NavbarDiv = styled.nav`
  position: fixed;
  top: 0px;
  background: ${props => props.color}};
  width: 100%;
  margin: 0;
  z-index: 1000;
  height: 60px;
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
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    transition: background 0.2s;
  }

  a:hover, a:focus {
    background: rgba(0, 0, 0, 0.2);
    text-decoration: underline black;
  }

  @media(max-width: ${breakpoints.laptop}) {
    width: calc(100% - 20px);
  }
`

const NavbarLinks = styled.div`
  fontWeight: 500;
  font-size: 1.2rem;
  margin: 0;
  padding-left: 10px;
  display: inline-block;
  transition: color 0.2s;

  a {
    color: ${props => props.color};
    margin-left: 20px;
  }
`

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  const getNavColor = () => {
    if (uiColor.default) {
      return '#4c4e52'
    } else {
      return uiColor.light
    }
  }

  return (
    <NavbarDiv color={getNavColor()}>
      <NavbarContent>
        <Link to='/' onClick={() => dispatch(resetUIColor())}><ChromaLogo /></Link>
        <NavbarLinks color={getTextColor(uiColor)}>
          <Link to='/all'>Latest Polls</Link>
          <Link to='/create'>New Poll</Link>
        </NavbarLinks>
      </NavbarContent>
    </NavbarDiv>
  )
}

export default Navbar