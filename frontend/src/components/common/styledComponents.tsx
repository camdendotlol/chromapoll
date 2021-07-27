import styled from "styled-components";
import breakpoints from "../../breakpoints";

// Should be used in combination with react-router's Link component
export const PrettyLink = styled.p`
  color: orange;
  border: 4px solid orange;
  border-radius: 20px;
  padding: 16px;
  font-size: 1.3rem;
  transition: 0.2s;

  :hover {
    background: orange;
    color: black;
  }

  @media (max-width: ${breakpoints.laptop}) {
    padding: 12px;
    font-size: 1rem;
  }
`