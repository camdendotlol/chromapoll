import styled from "styled-components";

// Should be used in combination with react-router's Link component
export const PrettyLink = styled.p`
  color: orange;
  border: 4px solid orange;
  border-radius: 20px;
  padding: 16px;
  font-size: 1.3rem;

  :hover {
    background: orange;
    color: black;
  }
`