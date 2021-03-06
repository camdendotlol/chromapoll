import React from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CenteredSubtitle, PrettyLink } from '../common/styledComponents'
import Logo from '../common/Logo'
import breakpoints from '../../breakpoints'
import { animated, useSpring } from '@react-spring/web'
import { Helmet } from 'react-helmet'

const HomeDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 20px;

  // Make room for navbar on top and Container's bottom margin
  height: calc(100vh - 100px);

  > * {
    margin: 0 auto;
  }
`

const TitleDiv = styled(animated.div)`
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
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 300 }
  })

  return (
    <HomeDiv>
      <Helmet>
        <title>Chromapoll</title>
        <link rel='canonical' href='https://chromapoll.xyz' />
      </Helmet>
      <TitleDiv style={props}>
        <Logo size={'100px'} />
        <Title text={'Chromapoll!'} />
      </TitleDiv>
      <CenteredSubtitle>Consensus voting with colors</CenteredSubtitle>
      <Link to='/latest'>
        <PrettyLink>See polls</PrettyLink>
      </Link>
    </HomeDiv>
  )
}

export default HomePage
