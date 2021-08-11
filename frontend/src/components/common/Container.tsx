import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'

const ContainerDiv = styled.div`
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 20px;
  width: 80%;

  @media(max-width: ${breakpoints.laptop}) {
    width: 100vw;
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