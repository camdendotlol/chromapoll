import config from './config'
import http from 'http'
import path from 'path'
import app from './app'
import fs from 'fs'

const server = http.createServer(app)

// get a list of files in /build
const staticFolder = path.join(__dirname, '..', 'frontend')
const staticFiles = fs.readdirSync(staticFolder)

app.get('/:path', (req, res) => {
  if (staticFiles.includes(req.params.path)) {
    return res.sendFile(path.join(staticFolder, req.params.path))
  } else {
    return res.sendFile(path.join(staticFolder, 'index.html'))
  }
})

// Provide the homepage for any unknown frontend request, URLs created by react-router will still work.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

server.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)
})

export default server