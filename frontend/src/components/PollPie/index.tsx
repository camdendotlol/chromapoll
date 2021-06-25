import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

const pollSVG = (
  <svg height="600" width="600">
    <circle cx="300" cy="300" r="240" stroke="black" strokeWidth="3" fill="red" />
  </svg>
)

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
        {pollSVG}
      </div>
    </div>
  )
}

export default PollPie