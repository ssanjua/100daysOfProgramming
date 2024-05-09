const http = require('http')

const server = http.createServer((req, res) => {
  res.end('poto')
})

server.listen(3000, () => {
  console.log('escucho')
})