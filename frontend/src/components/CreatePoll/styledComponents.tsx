import styled from "styled-components"

export const PollFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  form {
    margin: 0 auto;
  }

  p {
    text-align: left;
  }
`

export const FormItem = styled.div`
  label {
    font-size: 1.2rem;
    text-align: left;
  }

  input {
    font-size: 1.1rem;
    width: 90%;
    padding: 10px;
    margin: 0 auto;
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

  :nth-child(1) {
    flex-grow: 3
  }

  :nth-child(2) {
    flex-grow: 1
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