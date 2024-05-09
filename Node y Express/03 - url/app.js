const miURL = new URL('https:www.ejemplo.org/cursos/programacion?ordenar=vistas&niveles=1')

console.log(miURL.hostname) // web = www.ejemplo.com
console.log(miURL.pathname) // path
console.log(miURL.searchParams) // parametros query
console.log(miURL.searchParams.get('ordenar'))
console.log(miURL.searchParams.get('niveles'))
