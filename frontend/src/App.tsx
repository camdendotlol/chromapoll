import React from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import Poll from './components/Poll'
import Container from './components/common/Container'
import Navbar from './components/Navbar'
import './global-styles.css'

const App: React.FC = () => (
  <>
    <Navbar />
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
  </>
)

export default App