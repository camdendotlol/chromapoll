import React from 'react'
import styled from 'styled-components'

interface Props {
  label: string,
  callback: () => void
}

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  display: block;
  margin: 0 auto;

  :hover, :focus {
    cursor: pointer;
  }

  :hover span, :focus span {
    color: orange;
  }
`
  
const Label = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: bolder;
`

const Button: React.FC<Props> = ({ label, callback }) => {
  return (
    <StyledButton onClick={() => callback()}>
      <Label>{label}</Label>
    </StyledButton>
  )
}

export default Button