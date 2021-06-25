import React from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'

import './global-styles.css'
import PollPie from './components/PollPie'

const App: React.FC = () => (
  <Switch>
    <Route path='/example'>
      <PollPie />
    </Route>
    <Route path='/'>
      <HomePage />
    </Route>
  </Switch>
)

export default App