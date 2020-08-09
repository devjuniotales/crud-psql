const express = require('express')
const UserController = require('./controllers/UserController')
const routes = express()

routes.get('/users',UserController.index)
routes.post('/users',UserController.create)
routes.put('/users/:id',UserController.update)
routes.delete('/users/:id',UserController.delete)

module.exports = routes