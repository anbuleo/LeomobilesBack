
import Cart from "../Models/cart.js"
import Product from "../Models/ProductModel.js"
import Razorpay from 'razorpay'
import env from 'dotenv'
import Sale from "../Models/sale.js"


env.config()

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

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

const paymentupdate = async(req,res,next)=>{
    try {
            let {totalprice,shippingAddress,userId} = req.body
            let totalPrice = Number(totalprice)
            
            let cart = await Cart.find({userId:userId}).populate('userId', 'userName') // Populate user fields
            .populate('productId', 'sellingPrice').exec()

            // Prepare products for the sale
    const products = cart?.map((item) => {
        const totalProductPrice = 1 * item.productId.sellingPrice; // Snapshot price from Product schema
        return {
          product: item.productId._id,
          quantity: 1,
          sellingPrice: Number(item.productId.sellingPrice), // Use current product price
          totalProductPrice,
        };
      });

        
      
        
        let saleProduct =  new Sale({userId,products:products,totalPrice,shippingAddress})
      



        //   let newProSale =   await saleProduct.save()

            // console.log(saleProduct)
           

            let options = {
                amount:  totalPrice *100,
                currency: "INR",
                receipt: saleProduct._id
            }
           const order = await razorpay.orders.create(options)
           await saleProduct.save()
           res.status(201).json({
            orderId:order.id,
            amount:totalPrice,
            cartItems:products,
            userShiping:shippingAddress,
            userId,
            payStatus:'created',
            saleId:saleProduct._id

           })
          await saleProduct.save()

        
    } catch (error) {
        next(error)
    }
}


const paymentSucess = async(req,res,next)=>{
    try {
        let {saleId,orderId,
            paymentId,
            signature,} = req.body

            let sale = await Sale.findByIdAndUpdate({_id:saleId},{orderId,
                paymentId,
                signature,paymentStatus:'Completed',orderStatus:'Shipped'},  { new: true, runValidators: true })


                // console.log(sale)

                res.status(201).json({
                    message:'payment success',sale
                })
    } catch (error) {
        next(error)
    }
}



const getSalebyId = async(req,res,next)=>{


    try{
        let {id} = req.params
        let order = await Sale.findById(id)
        if(!order)return next({statusCode:400,message:'No order found by Id'})


            res.status(200).json({
                message:'ordered data',
                order
            })

    }catch(error){
        console.log(error)
        next(error)
    }
}
const getAllSale = async(req,res,next)=>{


    try{
       
        let order = await Sale.find()
        if(!order)return next({statusCode:400,message:'No order found by Id'})

            // console.log(order)
            res.status(200).json({
                message:'ordered data',
                order
            })

    }catch(error){
        console.log(error)
        next(error)
    }
}

const deleteAllinCart = async(req,res,next)=>{
    try {
        let id = req.params.id
        let result = await Cart.deleteMany({userId:id})
        // console.log(result);
        
        res.status(200).json({
            message:'cart deleted'
        })
    } catch (error) {
        next(error)
    }
}
export default {
    addTocart,
    getCartByUser,
    deleteCart,
    paymentupdate,
    paymentSucess,
    deleteAllinCart,
    getSalebyId,
    getAllSale
}