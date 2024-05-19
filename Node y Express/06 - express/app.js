const express = require('express')
const app = express()

const { infoCursos } = require('./datos/cursos.js')

// ROUTERS
const routerProgramacion = require('./routers/programacion.js')
app.use('/api/programacion', routerProgramacion)

const routerMatematicas = require('./routers/matematicas.js')
app.use('/api/matematicas', routerMatematicas)

// routing
app.get('/', (req, res) => {
  res.send('jsjsjsj')
})

app.get('/api/cursos', (req, res) => {
  res.json(infoCursos)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server listening ${PORT}`)
})