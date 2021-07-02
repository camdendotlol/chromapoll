import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  condition: boolean,
  primaryLabel: string,
  secondaryLabel: string,
  callback: (arg0: boolean) => void
}

const Button = styled.button`
  display: block;
  margin: 0 auto;
`

const ToggleButton: React.FC<Props> = ({ condition, primaryLabel, secondaryLabel, callback }) => {
  return (
    <Button onClick={() => callback(!condition)}>
      {condition ? secondaryLabel : primaryLabel}
    </Button>
  )
}

export default ToggleButton