import React, { CSSProperties } from 'react'
import { PollOption } from '../../types'

interface Props {
  results: PollOption[]
}

const boxStyles = {
  border: '2px solid #e9e9e9',
  padding: '10px',
  background: '#e9e9e9',
  borderRadius: '10px'
}

const listStyles: CSSProperties = {
  listStyle: 'none',
  padding: '10px'
}

const itemStyles: CSSProperties = {
  fontFamily: 'sans-serif'
}

const Legend: React.FC<Props> = ({ results }) => {
  const colorKey = (color: string) => (
    <svg width='10' height='10'>
      <rect width='10' height='10' fill={color} />
    </svg>
  )

  return (
    <div style={boxStyles}>
      <ul style={listStyles}>
        {results.map(r =>
          <li key={r.label} style={itemStyles}>
            {colorKey(r.color)}
            &nbsp;
            {r.label}
            &nbsp;-&nbsp;
            {/* The null check here is just a formality to make TS happy */}
            {r.percent ? `${Math.floor(r.percent * 100) / 100}%` : null}
          </li>
          )}
      </ul>
    </div>
  )
}

export default Legend