import config from './config'
import http from 'http'
import path from 'path'
import app from './app'
import fs from 'fs'
import { wsSocket } from './socket'
import { Socket } from 'net'
import { getMetadata } from './metadata'

const server = http.createServer(app)

server.listen(config.PORT)

// get a list of files in /build
const staticFolder = path.join(__dirname, '..', 'frontend')
// filter out index.html for special treatment
const staticFiles = fs.readdirSync(staticFolder).filter(filename => filename !== 'index.html')
// read index.html to a string so we can replace parts of it later
const indexPage = fs.readFileSync(`${staticFolder}/index.html`, 'utf8')

// Handle OpenGraph social media cards
app.get('/cards/*', async (req, res) => {
  return res.sendFile(path.join(staticFolder, req.path))
})

app.get('/:path', async (req, res) => {
  if (staticFiles.includes(req.params.path)) {
    return res.sendFile(path.join(staticFolder, req.params.path))
  } else {
    const formattedIndexPage = await getMetadata(req.path, indexPage)
    return res.send(formattedIndexPage)
  }
})

server.on('upgrade', (request, socket, head) => {
  // TODO: this breaks websockets on the dev server
  // see https://github.com/mythmakerseven/chromapoll/issues/21
  wsSocket.handleUpgrade(request, socket as Socket, head, socket => {
    wsSocket.emit('connection', socket, request)
  })
})

// Provide the homepage for any unknown frontend request, so URLs created by react-router will still work.
app.get('/*', async (req, res) => {
  const formattedIndex = await getMetadata(req.path, indexPage)
  res.send(formattedIndex)
})

// eslint-disable-next-line no-console
console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)

export default server