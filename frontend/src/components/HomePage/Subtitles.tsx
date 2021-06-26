import React, { CSSProperties, useState } from 'react'
import Trail from '../common/animation/Trail'

interface Props {
  items: string[]
}

const subtitleStyle: CSSProperties = {
  textAlign: 'center',
  color: '#D3D3D3',
  fontSize: '3rem',
}

const Subtitles: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <Trail open={true}>
        {items.map(i => <p style={subtitleStyle} key={i}>{i}</p>)}
      </Trail>
    </div>
  )
}

export default Subtitles