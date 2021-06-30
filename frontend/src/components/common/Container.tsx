import React from 'react'
import styled from 'styled-components'

const ContainerDiv = styled.div`
  margin: 0 auto;
  max-width: 80%;
  position: relative;
  top: 60px;

  @media(max-width: 1040px) {
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
`

const Container: React.FC = ({ children }) => {
  return (
    <ContainerDiv>
      {children}
    </ContainerDiv>
  )
}

export default Container