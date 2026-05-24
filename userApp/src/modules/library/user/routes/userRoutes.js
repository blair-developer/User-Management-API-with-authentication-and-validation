const express = require('express')

const userController = require('../controllers/userController')
const { isUser } = require('../../middlewares/authService')
const userValidator = require('../../validations/userValidations/userValidator')
const imageStorage = require('../../middlewares/imageStorage')
const userAuthentication = require('../../middlewares/authToken')

const userRouter = express.Router()

userRouter.post('/signupUser', userController.signupUser)
userRouter.post('/userLogin', userController.loginUser)
userRouter.post('/forgetPassword', userController.forgetPassword)
userRouter.post('/resetPassword/:userId/:token', userController.resetPassword)
userRouter.post('/setNewPassword/:userId', userController.setNewPassword)
userRouter.get('/viewProfile/:userId', userController.viewProfile)
userRouter.patch('/editProfile/:userId', userController.editProfile)
userRouter.get('/userDashBoard', userController.userDashBoard)

module.exports = userRouter
