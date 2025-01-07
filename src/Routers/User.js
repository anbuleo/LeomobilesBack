import express from 'express'
import userController from '../Controller/User.controller.js'

let Router = express.Router()



Router.post('/signup',userController.SignUp)
Router.post('/signin',userController.signIn)



export default Router