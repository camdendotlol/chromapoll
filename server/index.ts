import config from './config'
import http from 'http'
import path from 'path'
import app from './app'
import express from 'express'
import { wsSocket } from './socket'
import { Socket } from 'net'

const server = http.createServer(app)

server.listen(config.PORT)

app.use(express.static(path.join(__dirname, '..', 'frontend')))

server.on('upgrade', (request, socket, head) => {
  wsSocket.handleUpgrade(request, socket as Socket, head, socket => {
    wsSocket.emit('connection', socket, request)
  })
})

// Provide the homepage for any unknown frontend request, so URLs created by react-router will still work.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

// eslint-disable-next-line no-console
console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)

export default server