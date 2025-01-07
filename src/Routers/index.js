import express from 'express'
import userRouter from './User.js'
import productRouter from './Product.js'
import saleRouter from './sale.js'

const Router = express.Router()


Router.use('/user',userRouter)
Router.use('/product',productRouter)
Router.use('/sale',saleRouter)


export default Router