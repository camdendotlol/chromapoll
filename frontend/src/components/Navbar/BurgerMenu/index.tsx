import React from 'react'
import { Link } from 'react-router-dom'
import { ExitButton, FullScreenContainer, MenuList } from './styledComponents'

interface Props {
  setMenuOpen: (arg: boolean) => void,
  menuOpen: boolean
}

const BurgerMenu: React.FC<Props> = ({ setMenuOpen, menuOpen }) => {
  return (
    <FullScreenContainer property={menuOpen ? '-100%' : '0'}>
    <ExitButton
      onClick={() => setMenuOpen(false)}
    >
      X
    </ExitButton>
    <MenuList>
      <li><Link to='/' onClick={() => setMenuOpen(false)}>Home</Link></li>
      <li><Link to='/latest' onClick={() => setMenuOpen(false)}>Recent polls</Link></li>
      <li><Link to='/create' onClick={() => setMenuOpen(false)}>Create a poll</Link></li>
      <div>
        <p>Made in Kentucky</p>
        <p>by Camden Mecklem</p>
        <p>with React, Express, and MongoDB</p>
      </div>
    </MenuList>
   </FullScreenContainer>
  )
}

export default BurgerMenu