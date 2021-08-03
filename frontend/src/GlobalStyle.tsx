import { createGlobalStyle } from "styled-components";

export interface Theme {
  backgroundColor: string
}

export const GlobalStyle = createGlobalStyle<{ theme: Theme}>`
  body {
    background: ${props => props.theme.backgroundColor};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Noto Sans JP";
    color: #e9e9e9;
    transition: background 0.2s;
  }

  a {
    color: orange;
    text-decoration: none;
  }
`