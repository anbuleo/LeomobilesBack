import mongoose from "../common/db.connect.js";



const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    createdAt:{type:Date, default:Date.now()}
})


const Cart = mongoose.model('cart',cartSchema)


export default Cart


