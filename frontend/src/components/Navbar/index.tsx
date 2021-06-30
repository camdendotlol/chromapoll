import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ChromaLogo from './ChromaLogo'

const styles: CSSProperties = {
  position: 'fixed',
  top: '0px',
  background: '#4C4E52',
  // height: '60px',
  width: '100%',
  margin: '0',
  zIndex: 1000,
  boxShadow: '0 0 3px #4e4a4a',
}

const NavbarContent = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`

const Navbar: React.FC = () => {
  return (
    <div style={styles}>
      <NavbarContent>
        <Link to='/'><ChromaLogo /></Link>
      </NavbarContent>
    </div>
  )
}

export default Navbar