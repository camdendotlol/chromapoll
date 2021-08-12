import styled from "styled-components"
import breakpoints from "../../breakpoints"

export const NavbarDiv = styled.nav`
  position: fixed;
  top: 0px;
  background: ${props => props.color}};
  width: 100%;
  margin: 0;
  z-index: 100;
  height: 60px;
  box-shadow: 0 0 3px #4e4a4a;
  transition: background 0.2s;
`

export const NavbarContent = styled.div`
  width: 60%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    transition: background 0.2s;
  }

  a:hover, a:focus {
    background: rgba(0, 0, 0, 0.2);
    text-decoration: underline black;
  }

  @media(max-width: ${breakpoints.laptop}) {
    width: calc(100% - 20px);
  }
`

export const NavbarLinks = styled.div`
  font-weight: 800;
  font-size: 1.2rem;
  margin: 0;
  padding-left: 10px;
  display: inline-block;
  transition: color 0.2s;

  a {
    color: ${props => props.color};
    margin-left: 20px;
    padding: 8px;
    border-radius: 10px;
  }

  @media (max-width: ${breakpoints.phone}) {
    display: none;
  }
`

export const BurgerButton = styled.div`
  display: none;
  transition: 0.2s;
  margin-right: 10px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.phone}) {
    display: initial;

    hr {
      width: 30px;
      border-radius: 10px;
      border-top: 3px solid ${props => props.color};
      color: ${props => props.color};
      background: ${props => props.color};
    }
  }
`