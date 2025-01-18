import express from 'express'
import userController from '../Controller/User.controller.js'
import { validateSentres } from '../utilis/validate.js'

let Router = express.Router()



Router.post('/signup',userController.SignUp)
Router.post('/signin',userController.signIn)
Router.get('/verify',validateSentres)



export default Router