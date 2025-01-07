import mongoose from '../common/db.connect.js'


let ProductSchema = new mongoose.Schema({
    productName:{type:String,required:[true,'product Name required']},
    productType:{type:Object},
    brandName: {type:String,required:[true,'product Brand Name required']},
    productImage: {type:String,default:''},
    description: {type:String,required:[true,'product description required']},
    price: {type:String,required:[true,'product price required']},
    sellingPrice: {type:String,required:[true,'product sellingPrice  required']},
    stock:{type:String,required:[true,'Quantity  required']},
},
{Collection: 'products',
versionKey:false})

let Product =  mongoose.model('product',ProductSchema)

export default Product

