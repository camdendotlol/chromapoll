import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import AnimatedChart from './AnimatedChart'

const pollDivStyles: CSSProperties = {
  display: 'flex',
  height: '100vh',
  width: '100%',
  padding: 0,
  margin: 0,
  alignItems: 'center',
  justifyContent: 'center'
}

const homeLinkStyles: CSSProperties = {
  display: 'block',
  textAlign: 'center'
}

const PollPie: React.FC = () => {
  return (
    <div>
      <Link to='/' style={homeLinkStyles}>Back home</Link>
      <div style={pollDivStyles}>
        <AnimatedChart />
      </div>
    </div>
  )
}

export default PollPie