import mongoose from "../common/db.connect.js";


const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema = new mongoose.Schema({
    userName:{type:String,required:[true,'Name is Required']},
    email:{type:String,required:[true,'Email is Required'],validate:validateEmail},
    phoneNumber:{type:String,required:[true,'Mobile Number is Required']},
    address:{type:String,required:[true,'Address is Required']},
    password:{type:String,required:[true,'Password is Required']},
    role:{type:String,default:'customer'},
    createdAt:{type:Date, default:Date.now()},
   
},{
    collection:'users',
    versionKey:false
})

const User = mongoose.model('user',userSchema)

export default User
