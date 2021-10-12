import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { ChoiceWithData } from '../../../types'
import { mixColors } from '../../lib'
import { useAppDispatch } from '../../../hooks'
import { updateUIColor } from '../../../reducers/colorReducer'

interface Props {
  results: ChoiceWithData[]
}

const Chroma: React.FC<Props> = ({ results }) => {
  const [color, setColor] = useState('rgba(0, 0, 0, 0)')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const newColor = mixColors(results)
    setColor(newColor)
    dispatch(updateUIColor(newColor))
  }, [results])

  const props = useSpring({
    from: {
      fill: 'transparent'
    },
    to: {
      fill: color
    },
    config: {
      duration: 240
    }
  })

  return (
    <animated.circle id='chroma-circle' style={props} cx='200' cy='200' r='200' fill={color} />
  )
}

export default Chroma