import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'

interface Props {
  text: string
}

const AnimatedHeader = styled(animated.h1)`
  text-align: center;
  font-size: 5rem;

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 3rem;
  }

  @media (max-width: ${breakpoints.phone}) {
    font-size: 2rem;
  }
`

const Title: React.FC<Props> = ({ text }) => {
  const props = useSpring({
    from: {
      color: '#d3d3d3'
    },
    to: [
      { color: 'red' },
      { color: 'green' },
      { color: 'blue' }
    ],
    // delay: 500,
    loop: {
      reverse: true,
      from: {
        color: 'blue'
      }
    },
    config: {
      duration: 3000
    }
  })

  return (
    <AnimatedHeader style={props}>{text}</AnimatedHeader>
  )
}

export default Title