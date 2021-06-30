import React, { CSSProperties } from 'react'

const styles: CSSProperties = {
  fontWeight: 1000,
  fontSize: '3rem',
  margin: 0,
  paddingLeft: '10px',
  background: 'linear-gradient(to top right, #36A4C7, #B13E84)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  WebkitBackgroundClip: 'text'
}
const ChromaLogo: React.FC = () => {
  return (
    <p style={styles}>C</p>
  )
}

export default ChromaLogo