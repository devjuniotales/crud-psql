const express = require('express')
const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ProdsController = require('./controllers/ProdsController')
const AuthController = require('./controllers/AuthController')
const AuthMiddleware = require('./middlewares/AuthMid')

const routes = express()

routes.get('/users',AuthMiddleware,UserController.index)
routes.post('/users',UserController.create)
routes.put('/users/:id',UserController.update)
routes.delete('/users/:id',UserController.delete)

routes.get('/projects',ProjectController.index)
routes.post('/projects',ProjectController.create)

routes.post('/prods', AuthMiddleware,ProdsController.create)
routes.get('/prods', ProdsController.index)
routes.put('/prods/:id', ProdsController.update)
routes.delete('/prods/:id', ProdsController.delete)


routes.post('/auth',AuthController.authenticate)

module.exports = routes