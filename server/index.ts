import config from './config'
import http from 'http'
import path from 'path'
import app from './app'

const server = http.createServer(app)

app.get('/ui.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'ui.js'))
})

// Provide the homepage for any unknown frontend request, URLs created by react-router will still work.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

server.listen(config.PORT, () => {
  console.log(`Chromapoll API is ready at http://localhost:${config.PORT}`)
})

export default server