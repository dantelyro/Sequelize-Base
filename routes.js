const router = require('express').Router()
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const verifyToken = AuthController.verifyToken

//Login
router.post('/user/login', AuthController.login)

//User routes
router.post('/user/register', verifyToken, UserController.register)
router.get('/user/findall', verifyToken, UserController.search)
router.delete('/user/delete', verifyToken, UserController.delete)
router.patch('/user/update', verifyToken, UserController.update)

module.exports = router
