const express = require('express')

const { programacion } = require('../datos/cursos.js').infoCursos

const routerProgramacion = express.Router()

//middleware
routerProgramacion.use(express.json())

// uso el router para no repetir /api/cursos/programacion
routerProgramacion.get('/', (req, res) => {
  res.json(programacion)
})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje
  const nivel = req.params.nivel

  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel )

  if(resultados.length === 0) {
    res.status(404).send(`no se encontraron ${lenguaje} de nivel ${nivel}`)
  }

  res.json(resultados)
})

// params URL
routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje)

  if(resultados.length === 0) {
    return res.status(404).send(`no se encontraron ${lenguaje}`)
  }

  // QUERY PARAMS
  // ordenar resultados de acuerdo al numero de vistas
  if (req.query.ordenar === 'vistas') {
    return res.json(resultados.sort((a,b) => b.vistas - a.vistas ))
  }
  // esto se ve en: /api/programacion/python?ordenar=vistas
  res.json(resultados)
})

routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body
  programacion.push(cursoNuevo)
  res.json(programacion)
})

routerProgramacion.put('/:id', (req, res) => {
  let cursoActualizado = req.body
  const id = req.params.id

  const indice = programacion.findIndex(curso => curso.id == id)

  if(indice >= 0) {
    programacion[indice] = cursoActualizado
  }
  res.json(programacion)
})

routerProgramacion.patch('/:id', (req, res) => {
  let infoActualizada = req.body
  const id = req.params.id

  const indice = programacion.findIndex(curso => curso.id == id)

  if(indice >= 0) {
    const cursoAModificar = programacion[indice]
    Object.assign(cursoAModificar, infoActualizada)
  }
  res.send(JSON.stringify(programacion))
})

routerProgramacion.delete('/:id', (req, res) =>{
  const id = req.params.id

  const indice = programacion.findIndex(curso => curso.id == id)

  if(indice >= 0) {
    programacion.splice(indice, 1)
  }
  res.json(programacion)
})

module.exports = routerProgramacion