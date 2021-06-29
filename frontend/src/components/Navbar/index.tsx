import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import ChromaLogo from './ChromaLogo'

const styles: CSSProperties = {
  position: 'fixed',
  top: '0px',
  background: '#4C4E52',
  height: '60px',
  width: '100%',
  margin: '0',
  zIndex: 1000,
  boxShadow: '0 0 3px #4e4a4a',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const Navbar: React.FC = () => {
  return (
    <div style={styles}>
      <Link to='/'><ChromaLogo /></Link>
    </div>
  )
}

export default Navbar