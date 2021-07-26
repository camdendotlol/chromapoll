import React from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import Poll from './components/Poll'
import Container from './components/common/Container'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './global-styles.css'

const App: React.FC = () => (
  <div>
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
    <Footer />
  </div>
)

export default App