import ws from 'ws'

export let socketClients: SocketMap[] = []

interface SocketMap {
  socket: ws,
  pollID: string | null,
  active: boolean
}

export const wsSocket = new ws.Server({ noServer: true })
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

  socket.on('close', () => {
    const clientToYeet = socketClients.find(client => socket === client.socket)

    if (!clientToYeet) {
      return socketClients
    }

    return socketClients = socketClients.filter(client => clientToYeet.socket !== client.socket)
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
}, 30000)

heartbeat()