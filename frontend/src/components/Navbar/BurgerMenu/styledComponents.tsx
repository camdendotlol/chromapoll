import styled from "styled-components";

export const FullScreenContainer = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #e9e9e9;
  width: 100vw;
  height: 100vh;
  color: black;
`

export const ExitButton = styled.span`
  position: absolute;
  font-size: 3rem;
  right: 20px;
  font-weight: 900;
  user-select: none;

  :hover {
    cursor: pointer;
  }
`

export const MenuList = styled.ul`
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
  padding: 0;
  list-style: none;
  font-weight: 900;
  line-height: 1.6;
  
  li {
    font-size: 2.5rem;
    text-align: center;
    text-decoration: underline;
  }

  li a {
    color: black;
  }

  div {
    font-size: 1rem;
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
    padding: 0;
    margin: 0;
    color: #A9A9A9;
    line-height: 0.1;
    font-weight: 200;
  }
`