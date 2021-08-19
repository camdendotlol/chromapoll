import ws from 'ws'

export let socketClients: SocketMap[] = []

interface SocketMap {
  socket: ws,
  pollID: string | null,
  active: boolean
}

export const wsSocket = new ws.Server({ port: 7991 })
wsSocket.on('connection', (socket) => {

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