import styled from "styled-components"
import breakpoints from "../../breakpoints"

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
  }

  input[type=color] {
    border: none;
    border-radius: 50%;
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

  :hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`

export const ChoiceItem = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
  margin-bottom: 20px;

  * input {
    width: 90%;
  }

  div:nth-child(1) {
    width: calc(65% - 20px);
  }

  div:nth-child(2) {
    width: calc(20% - 20px);
  }

  div:nth-child(3) input {
    align-self: center;
    height: 40px;
    width: 40px;
    position: relative;
    top: 40%;
  }
`

export const ExpansionButtons = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 10px;

  button {
    padding: 10px;
    border-radius: 10px;
    font-size: 1.2rem;
    border: none;
    text-align: center;
    transition: 0.2s;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`