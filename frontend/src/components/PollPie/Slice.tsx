import React from 'react'

interface Props {
  color: string,
  percentage: number,
  offset: number
}

const getDashArray = (percentage: number) => {
  return percentage * 314.16 / 100
}

const Slice: React.FC<Props> = ({ percentage, offset, color }) => {
  return (
    <circle
      cx='100'
      cy='100'
      r='50'
      fill='transparent'
      stroke={color}
      strokeDasharray={`${getDashArray(percentage)} 314.16`}
      strokeWidth='100'
      strokeDashoffset={`-${offset * 3.14159}`}
      transform='rotate(-90) translate(-200)'
    />
  )
}

export default Slice