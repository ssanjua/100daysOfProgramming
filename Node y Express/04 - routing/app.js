const http = require('http')

const cursos = require('./cursos')

const server = http.createServer((req, res) => {
  const { method } = req

  switch(method) {
    case 'GET':
      return manejarGet(req, res)
    case 'POST':
      return manejarPost(req,res)
    default:
      console.log(`el metodo ${method} no puede`)
  }
});

function manejarPost(req,res) {
  const path = req.url

  if (path === '/cursos/programacion') {
    return res.end('el server recibio post para /cursos/programacion')
  }
}

function manejarGet(req, res) {
  const path = req.url

  if(path === '/') {
    res.statusCode = 200;
    res.end('primer servidor y API')
  } else if (path === '/cursos') {
    res.statusCode = 200
    res.end(JSON.stringify(cursos.infoCursos))
  } else if (path === '/cursos/programacion') {
    res.statusCode = 200 
    res.end(JSON.stringify(cursos.infoCursos.programacion))
  } else 
  res.statusCode = 404
  return res.end('lo que buscas no existe') //si el usuario pone otra cosa
}


const PORT = 3000

server.listen(PORT, () => {
  console.log(`cucha ${PORT}`)
})