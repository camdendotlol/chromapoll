import React from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import Poll from './components/Poll'
import Container from './components/common/Container'
import Navbar from './components/Navbar'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: #202020;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Noto Sans JP";
    color: #e9e9e9;
  }

  a {
    color: orange;
    text-decoration: none;
  }
`

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Navbar />
    <main>
      <Container>
        <Switch>
          <Route path='/all'>
            <AllPolls />
          </Route>
          <Route path='/poll/:id'>
            <Poll />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </main>
  </>
)

export default App