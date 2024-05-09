const http = require('http');

const server = http.createServer((req, res) => {
  res.end('hola, mundo') // finalizar o terminar y enviar la respuesta
});

const PUERTO = 3000;

server.listen(PUERTO, () => {
  console.log(`el server esta escuchando en el ${PUERTO}`)
});