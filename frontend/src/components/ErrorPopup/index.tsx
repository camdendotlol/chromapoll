import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setErrorMessage } from '../../reducers/errorReducer'

const PopupDiv = styled.div`
  position: absolute;
  top: 100px;
  width: 40vw;
  left: 30vw;
  z-index: 5000;
  height: 100px;
  background: #8B0000;
  color: white;
  margin: 0 auto;
  text-align: center;
  transition: opacity 0.2s;
  border-radius: 10px;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.about};

  @media (max-width: ${breakpoints.phone}) {
    width: 90vw;
    left: 5vw;
  }
`

const ErrorPopup: React.FC = () => {
  const [message, setMessage] = useState(null)
  const error = useAppSelector(({ error }) => error)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error) {
      setMessage(error)
      setTimeout(() => dispatch(setErrorMessage(null)), 3000)
    } else {
      setMessage(null)
    }
  }, [error])

  return (
    <PopupDiv about={message ? '0.95' : '0' }>
      <p>{message}</p>
    </PopupDiv>
  )
}

export default ErrorPopup