const http = require('http')

const server = http.createServer((req, res ) => {
  console.log('===> res (respuesta)')
  console.log(res.statusCode)

  res.setHeader(
    'content-type', 'application/json'
  )

  console.log(res.getHeaders())

  res.end("hello")
});

const PORT = 3000

server.listen(PORT, () => {
  console.log(`el server listen en ${PORT}`)
})
