import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChromaLogo from './ChromaLogo'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { getTextColor, isBright } from '../lib'
import { BurgerButton, NavbarContent, NavbarDiv, NavbarLinks } from './styledComponents'
import BurgerMenu from './BurgerMenu'
import { animated, useTransition } from 'react-spring'

const Navbar: React.FC = () => {
  const [navColor, setNavColor] = useState('#4c4e52')
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  useEffect(() => {
    setNavColor(() => {
      if (uiColor.default) {
        return '#4c4e52'
      } else {
        return uiColor.light
      }
    })
  }, [uiColor])

  const handleMenu = () => {
    if (menuOpen) {
      return (
        <BurgerMenu setMenuOpen={setMenuOpen} />
      )
    } else {
      return null
    }
  }

  return (
    <NavbarDiv color={navColor}>
      <NavbarContent>
        <Link to='/' onClick={() => dispatch(resetUIColor())}><ChromaLogo /></Link>
        <NavbarLinks color={getTextColor(uiColor)}>
          <Link to='/latest'>Latest Polls</Link>
          <Link to='/create'>New Poll</Link>
        </NavbarLinks>
        <BurgerButton
          color={isBright(navColor) ? 'black' : 'white'}
          onClick={() => setMenuOpen(true)}
        >
          <hr />
          <hr />
          <hr />
        </BurgerButton>
        {handleMenu()}
      </NavbarContent>
    </NavbarDiv>
  )
}

export default Navbar