const express = require('express')
const conn = require('./db/conn')
const routes = require('./routes')
const app = express()

app.use(express.urlencoded({ limit: '25mb', extended: true })) //Inserido depois dos testes OK
app.use(express.json({ limit: '25mb', extended: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept'
  )
  next()
})

app.use(routes)

conn
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(5000)
    console.log('app rodando na porta 5000')
  })
  .catch((error) => console.log(error))
