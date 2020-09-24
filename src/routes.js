const express = require('express')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ProdsController = require('./controllers/ProdsController')
const routes = express()

routes.get('/users',UserController.index)
routes.post('/users',UserController.create)
routes.put('/users/:id',UserController.update)
routes.delete('/users/:id',UserController.delete)

routes.get('/projects',ProjectController.index)
routes.post('/projects',ProjectController.create)

routes.post('/prods', ProdsController.create)
routes.get('/prods', ProdsController.index)

module.exports = routes