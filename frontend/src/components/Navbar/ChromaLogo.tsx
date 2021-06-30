import React, { CSSProperties } from 'react'
import styled from 'styled-components'

const LogoText = styled.p`
  fontWeight: 1000;
  font-size: 1.5rem;
  margin: 0;
  padding-left: 10px;
  background: linear-gradient(to top right, #1dfded, #ef45fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;

  &:hover {
    text-decoration: underline;
    text-decoration-color: #84a2f4;
  }
`

const ChromaLogo: React.FC = () => {
  return (
    <LogoText>Chromapoll</LogoText>
  )
}

export default ChromaLogo