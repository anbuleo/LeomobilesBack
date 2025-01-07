import express from 'express'
import ProductController from '../Controller/Product.controller.js'
import {validate} from '../utilis/validate.js'


let Router = express.Router()


Router.post('/createproduct',validate,ProductController.createProduct)
Router.put('/editbyid/:id',validate,ProductController.editProduct)
Router.get('/getproductbyid/:id',validate,ProductController.getProductById)
Router.get('/getallproduct',ProductController.getAllProducts)
Router.get('/getallproductbycat',ProductController.getProductBycatogary)
Router.get('/val',validate)
Router.delete('/delete/:id',validate,ProductController.deleteProduct)
// Router.post('/upload',ProductController.uploadImage)


export default Router