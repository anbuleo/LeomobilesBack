import express from  'express'
import { validate } from '../utilis/validate.js'
import saleController from '../Controller/sale.controller.js'


const Router = express.Router()

Router.post('/addcart',validate,saleController.addTocart)
Router.put('/getcartbyid',validate,saleController.getCartByUser)
Router.delete('/deletecart/:id',validate,saleController.deleteCart)




export default Router