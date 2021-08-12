import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'

const ContainerDiv = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;

  @media (max-width: ${breakpoints.phone}) {
    max-width: 95%;
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