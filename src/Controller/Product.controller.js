import Product from "../Models/ProductModel.js"
import { v2 as cloudinary } from 'cloudinary';




const createProduct = async(req,res,next)=>{
    let {productName} = req.body
    try {

        let product = await Product.findOne({productName})
        if(product) return next({statusCode:401,message:'Product Name must be Unique'})

            let newProduct = new Product(req.body)

            await newProduct.save()
            res.status(201).json({
                message:"Product Created Success"
            })

        
    } catch (error) {
        next(error)
    }
}

const editProduct = async(req,res,next) => {
    
        let id = req.params.id
    try {
        let product = await Product.findByIdAndUpdate({id},req.body,{new:true})
        console.log(product)
    } catch (error) {
        next(error)
    }
}
const getProductById = async(req,res,next) => {
    try {
        let {id} = req.params
        
        let product = await Product.findById(id)
        // console.log(product)
        if(!product) return next({statusCode:404,message:'Invaild product Id'})
            res.status(200).json({
                product
        })
    } catch (error) {
        next(error)
    }
}

const getAllProducts = async(req,res,next)=>{
    try {
        let products = await Product.find()
        if(products.length ==0) return  res.status(200).json({message:'no product Found'})

            res.status(200).json({products})
        
    } catch (error) {
        next(error)
    }
}

const getProductBycatogary = async(req,res,next)=>{
    try {
        let mobile = await Product.find({'productType.name':'mobile'})
        let headphone = await Product.find({'productType.name':'headphone'})
        let smartWatch = await Product.find({'productType.name':'smartWatch'})
        let speaker = await Product.find({'productType.name':'speaker'})
        // console.log(mobile)

        // if(mobile.status ==200 && headphone.status==200 && smartWatch.status)
        res.status(200).json({
            success: true,
            categories: {
                mobiles:mobile,
               headphones: headphone,
                smartWatchs:smartWatch,
                speakers:speaker
            },
          });
    } catch (error) {
        next(error)
    }
}

// const uploadImage =async (req,res,next)=>{
//     try {
//        console.log(req.body)
//        Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.cloud_name, 
//         api_key: process.env.api_key, 
//         api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
//     });
//     // const uploadResult = await cloudinary.uploader
//     //        .upload(
//     //            ""
//     //        )
//     //        .catch((error) => {
//     //            console.log(error);
//     //        });
        
//     //     console.log(uploadResult);

// // (async function() {

// //     // 
    
// //     // Upload an image
// //      const uploadResult = await cloudinary.uploader
// //        .upload(
// //            "", {
// //                public_id: 'shoes',
// //            }
// //        )
// //        .catch((error) => {
// //            console.log(error);
// //        });
    
// //     console.log(uploadResult);
    
// //     // Optimize delivery by resizing and applying auto-format and auto-quality
// //     // const optimizeUrl = cloudinary.url('shoes', {
// //     //     fetch_format: 'auto',
// //     //     quality: 'auto'
// //     // });
    
// //     // console.log(optimizeUrl);
    
// //     // Transform the image: auto-crop to square aspect_ratio
// //     // const autoCropUrl = cloudinary.url('shoes', {
// //     //     crop: 'auto',
// //     //     gravity: 'auto',
// //     //     width: 500,
// //     //     height: 500,
// //     // });
    
// //     // console.log(autoCropUrl);    
// // })();

//     } catch (error) {
//         next(error)
//     }
// }

const deleteProduct = async(req,res,next)=>{
    let{id}= req.params
    try {
        if(!id) return next({statusCode:401,message:'Product id missing'})

        let pro = await Product.findById(id)
        if(!pro) return next({statusCode:401,message:'Product not found'})
        let product = await Product.findByIdAndDelete(id)


        res.status(200).json({
            message: 'Product deleted'
        })

        // console.log(id,product)
    } catch (error) {
        next(error)
    }
}



export default {
    createProduct,
    editProduct,
    getProductById,
    getAllProducts,
    getProductBycatogary,
    deleteProduct
}
