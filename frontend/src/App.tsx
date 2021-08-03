import React from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import Poll from './components/Poll'
import Container from './components/common/Container'
import Navbar from './components/Navbar'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'
import { useAppSelector } from './hooks'
import { UIColor } from './reducers/colorReducer'
import CreatePoll from './components/CreatePoll'

const chromaTheme = (uiColor: UIColor) => ({
  backgroundColor: uiColor.dark
})

const App: React.FC = () => {
  const uiColor = useAppSelector(({ uiColor }) => uiColor)
  return (
    <ThemeProvider theme={() => chromaTheme(uiColor)}>
      <React.Fragment>
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
              <Route path='/create'>
                <CreatePoll />
              </Route>
              <Route path='/'>
                <HomePage />
              </Route>
            </Switch>
          </Container>
        </main>
      </React.Fragment>
    </ThemeProvider>
  )
}

export default App