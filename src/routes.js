const express = require('express')
const routes = express.Router()
const validate = require('express-validation')

// Controllers
const controllers = require('./app/controllers')

// Validators
const validators = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', validate(validators.User), controllers.UserController.store)
routes.post('/sessions', validate(validators.Session), controllers.SessionController.store)

routes.use(authMiddleware)

// Ads Routes
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

// Purchases Routes
routes.get('/purchases', controllers.PurchaseController.index)
routes.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.store)

// Aprove Purchase
routes.get('/approve/:ad', controllers.ApprovePurchaseController.store)

module.exports = routes