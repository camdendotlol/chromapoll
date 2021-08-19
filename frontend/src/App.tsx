import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import { Route, Switch } from 'react-router-dom'
import LatestPolls from './components/LatestPolls'
import Poll from './components/Poll'
import Container from './components/common/Container'
import Navbar from './components/Navbar'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'
import { useAppDispatch, useAppSelector } from './hooks'
import { UIColor } from './reducers/colorReducer'
import CreatePoll from './components/CreatePoll'
import ErrorPopup from './components/ErrorPopup'
import { updateVoteTotals } from './reducers/pollReducer'

const chromaTheme = (uiColor: UIColor, firstLoad: boolean) => ({
  backgroundColor: uiColor.dark,
  transition: firstLoad ? '0' : 'background 0.2s'
})

const App: React.FC = () => {
  const [firstLoad, setFirstLoad] = useState(true)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const dispatch = useAppDispatch()

  const uiColor = useAppSelector(({ uiColor }) => uiColor)

  // Prevent the 0.2s transition from white to black in the background on first load
  useEffect(() => {
    setFirstLoad(false)
  }, [])

  // This hook handles web sockets for poll pages. By hosting
  // it in the App component, it's able to gracefully close
  // the connection when navigating away from a poll page.
  useEffect(() => {
    // Close the old socket
    if (socket) {
      socket.close(1000)
      setSocket(null)
    }

    // Open a new one with the current poll if applicable
    if (window.location.pathname.slice(0, 6) === '/poll/') {
      const hostname = window.location.hostname
      const newSocket = new WebSocket(`ws://${hostname}:7991`)

      newSocket.onopen = () => {
        newSocket.send(window.location.pathname.slice(6))
      }

      newSocket.onmessage = message => {
        dispatch(updateVoteTotals({
          id: window.location.pathname.slice(6),
          choices: JSON.parse(message.data)
        }))
      }

      setSocket(newSocket)
    }
  }, [window.location.pathname])

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