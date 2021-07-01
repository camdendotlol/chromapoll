import React from 'react'
import { ChoiceWithData } from '../../../types'
import Slice from './Slice'

interface Props {
  results: ChoiceWithData[]
}

const Pie: React.FC<Props> = ({ results }) => {
  return (
    <>
      {results.map((r, index) => <Slice color={`${r.color}`} percentage={r.percent} offset={r.offset} index={index} key={r.id} />)}
    </>
  )
}

export default Pie