import express from 'express'
import env from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import Router from './src/Routers/index.js'
let app = express()
app.use(express.json())

env.config()

let PORT = process.env.PORT


app.use(bodyParser.json())
app.use(cors())

app.use('/api',Router)

app.listen(PORT,()=>console.log(`The Lisening port ${PORT}`))


//middleware

app.use((err,req,res,next)=>{
    // console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
