import config from './config'
import http from 'http'
import path from 'path'
import app from './app'
import express from 'express'
import ws from 'ws'
import { Socket } from 'net'

const server = http.createServer(app)

export let socketClients: SocketMap[] = []

interface SocketMap {
  socket: ws,
  pollID: string | null,
  active: boolean
}

export const wsSocket = new ws.Server({ noServer: true })
wsSocket.on('connection', (socket, req) => {

  socketClients.push({
    socket,
    pollID: null,
    active: true
  })

  socket.on('pong', () => {
    const socketToUpdate = socketClients.find(client => client.socket === socket)
    
    if (!socketToUpdate) {
      return null
    }
    
    socketToUpdate.active = true
  })

  socket.on('message', message => {
    const clientToUpdate = socketClients.find(client => socket === client.socket)

    if (!clientToUpdate) {
      return socketClients = socketClients.filter(ws => clientToUpdate !== ws.socket)
    }

    return clientToUpdate.pollID = message.toString()
  })
})

const heartbeat = () => setInterval(() => {
  socketClients.forEach((client) => {
    if (!client.active) {
      client.socket.terminate()
      socketClients = socketClients.filter(s => s.socket !== client.socket)
    }

    client.active = false

    return client.socket.ping()
  })
}, 3000)

heartbeat()

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