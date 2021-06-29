import React, { CSSProperties } from 'react'
import { animated, useSpring } from 'react-spring'

interface Props {
  text: string
}

const titleStyle: CSSProperties = {
  textAlign: 'center',
  fontSize: '5rem',
}

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
    delay: 2000,
    loop: { reverse: true },
    config: {
      duration: 3000
    }
  })

  return (
    <animated.p style={{ ...titleStyle, ...props }}>{text}</animated.p>
  )
}

export default Title