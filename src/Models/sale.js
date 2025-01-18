import mongoose from '../common/db.connect.js'


const saleSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product', // Reference to the Product schema
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
          },
          sellingPrice: {
            type: Number, // Snapshot of the product's price at the time of purchase
            required: true,
          },
          totalProductPrice: {
            type: Number, // Computed price (quantity * priceAtPurchase)
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number, // Computed sum of all products' totalProductPrice
        required: true,
       
      },
      
      paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
      },
      saleDate: {
        type: Date,
        default: Date.now,
      },
      shippingAddress: {
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalcode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
      },
      orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
      },
      signature:{
        type: String,
        default:null
      },
      orderId:{
        type:String,
        default:null
      },
      paymentId:{
        type:String,
        default:null
      },
      refund:{
        type:String,
        default:false
      }

})

const Sale = mongoose.model('sale',saleSchema)

export default Sale