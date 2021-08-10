import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CenteredSubtitle, PrettyLink } from '../common/styledComponents'
import Logo from '../common/Logo'
import breakpoints from '../../breakpoints'

const HomeDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 20px;

  // Make room for navbar on top
  height: calc(100vh - 80px);

  > * {
    margin: 0 auto;
  }
`

const TitleDiv = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 10px;

  > * {
    margin: 0 auto;
  }

  @media (max-width: ${breakpoints.phone}) {
    flex-flow: column;
  }
`

const HomePage: React.FC = () => {
  return (
    <HomeDiv>
      <TitleDiv>
        <Logo size={'100px'} />
        <Title text={'Chromapoll!'} />
      </TitleDiv>
      <CenteredSubtitle>Make polls with color</CenteredSubtitle>
      <Link to='/all'>
        <PrettyLink>See polls</PrettyLink>
      </Link>
    </HomeDiv>
  )
}

export default HomePage
