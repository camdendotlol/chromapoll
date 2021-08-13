import { animated } from 'react-spring'
import styled from 'styled-components'
import breakpoints from '../../breakpoints'

export const PollFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  form {
    margin: 0 auto;
  }

  p {
    text-align: left;
  }

  @media (max-width: ${breakpoints.phone}) {
    width: calc(100% - 20px);
  }
`

export const FormItem = styled.div`
  label {
    font-size: 1.2rem;
    text-align: left;
  }

  input[type=text] {
    font-size: 1.1rem;
    padding: 10px;
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    display: block;
    width: 90%;
  }

  input[type=color] {
    padding-left: 10px;
    border: none;
    background-color: transparent;
  }
}
`

export const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 1.2rem;
  border: none;
  float: right;
  transition: 0.2s;
  background: white;

  :hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`

export const ChoiceItem = styled(animated.div)`
  display: flex;
  margin: 0 auto;
  margin-bottom: 20px;
  justify-content: space-between;

  div:nth-child(1) {
    flex-grow: 4;
  }

  div:nth-child(1) {
    flex-grow: 1;
  }

  div:nth-child(2) label {
    margin-left: 5px;
  }
  
  div:nth-child(2) input {
    display: block;
    height: 40px;
    width: 80px;
  }
`

export const ExpansionButtons = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 10px;

  button {
    display: flex;
    justify-content: center;
    background: white;
    padding: 10px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    font-size: 1.2rem;
    border: none;
    text-align: center;
    transition: 0.2s;
    font-weight: 600;
  }

  // Just a little exta positioning to center the text
  button span {
    position: relative;
    top: -2px;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`