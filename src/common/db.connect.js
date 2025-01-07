import mongoose from "mongoose";
import env from 'dotenv'

env.config()


    const dbName = process.env.dbName
    const dbUrl = process.env.dbUrl
    try {
        mongoose.connect(`${dbUrl}${dbName}`)
        mongoose.set('strictPopulate', false);
        console.log('Database connected successfull')
        
    } catch (error) {
        console.log(error)
    }


export default mongoose