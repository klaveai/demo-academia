const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3005

app.use(express.static(path.join(__dirname, 'public')))

const pages = ['cursos', 'matricula', 'contacto']
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${page}.html`))
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Lingua Academia corriendo en http://localhost:${PORT}`)
})
