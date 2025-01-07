
import Cart from "../Models/cart.js"
import Product from "../Models/ProductModel.js"


const addTocart = async(req,res,next)=>{
    try {
        let {userId,productId} = req.body
        // console.log(req.body)
       
        let cart = await Cart.find({userId})
       let usercart = cart.filter((a,b)=>a.productId == productId)
        if(usercart.length>0) return res.status(200).json({message :'This product already in your cart'})
        let newCart = new Cart({userId,productId})
        // console.log(newCart,cart)
        await newCart.save()

        res.status(201).json({
            message:'Product Added Success',
            data :newCart

        })

    } catch (error) {
        // console.log(error)
        next(error)

    }
}


const getCartByUser  = async(req,res,next)=>{
    let arry = []
    let {id} = req.body

   
    try {
        let cart = await Cart.find({userId:id}).populate('userId', 'userName') // Populate user fields
        .populate('productId', 'productName  sellingPrice').exec()
        // console.log(req.body,cart)
        if(cart.length ==0) return next({statusCode:200,message:'No product in his cart'})

          
       res.status(200).json({
        message:'here a cart Product',
        data:cart
       })
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteCart = async(req,res,next)=>{
    try {
        let id = req.params.id

       let cartProduct = await Cart.findByIdAndDelete(id)

        if(!cartProduct ) return next({statusCode:300,message:"Product Removed Earlier"})
     

            res.status(200).json({
                message:'Cart Removed Success'
            })


    } catch (error) {
        next(error)
    }
}



export default {
    addTocart,
    getCartByUser,
    deleteCart
}