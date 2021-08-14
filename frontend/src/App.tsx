import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'
import LatestPolls from './components/LatestPolls'
import Poll from './components/Poll'
import Container from './components/common/Container'
import Navbar from './components/Navbar'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'
import { useAppSelector } from './hooks'
import { UIColor } from './reducers/colorReducer'
import CreatePoll from './components/CreatePoll'
import ErrorPopup from './components/ErrorPopup'

const chromaTheme = (uiColor: UIColor, firstLoad: boolean) => ({
  backgroundColor: uiColor.dark,
  transition: firstLoad ? '0' : 'background 0.2s'
})

const App: React.FC = () => {
  const [firstLoad, setFirstLoad] = useState(true)
  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  // Prevent the 0.2s transition from white to black in the background on first load
  useEffect(() => {
    setFirstLoad(false)
  }, [])

  return (
    <ThemeProvider theme={() => chromaTheme(uiColor, firstLoad)}>
      <React.Fragment>
        <GlobalStyle />
        <Navbar />
        <ErrorPopup />
        <main>
          <Container>
            <Switch>
              <Route path='/latest'>
                <LatestPolls />
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