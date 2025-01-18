import express from  'express'
import { validate } from '../utilis/validate.js'
import saleController from '../Controller/sale.controller.js'


const Router = express.Router()

Router.post('/addcart',validate,saleController.addTocart)
Router.put('/getcartbyid',validate,saleController.getCartByUser)
Router.delete('/deletecart/:id',validate,saleController.deleteCart)
Router.post('/paymentsale',validate,saleController.paymentupdate)
Router.get('/salebyid/:id',validate,saleController.getSalebyId)
Router.get('/sold',validate,saleController.getAllSale)
Router.put('/paymentsuccess',validate,saleController.paymentSucess)
Router.delete('/deleteCarts/:id',validate,saleController.deleteAllinCart)




export default Router