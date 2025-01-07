import User from '../Models/UserModel.js'
import {hashPassword, hashCompare, createToken} from '../utilis/validate.js'



const SignUp = async(req,res,next)=>{
   let {email,password} = req.body 

    try {
        let user =await User.find({email})
        if(user.length > 0){
           return next({statusCode:401,message:'userAlready exist'})
        }else if(user.length ==0){
            let hash =await hashPassword(password)
            let data = req.body;
            let addUser = {...data,password:hash}
            let newUser = new User({...addUser})
            await newUser.save() 
            res.status(201).json({
                message : 'UserCreated Success'
            })
      
        }
        



        
    } catch (error) {
        next(error)
    }
}
const signIn = async(req,res,next) => {
    let {email,password} = req.body;
     try {
        let user = await User.findOne({email})
        if(!user) return next({satusCode:404,message:'User Not Found'})
            let hCompare = await hashCompare(password,user.password)
        if(hCompare){
            let token = await createToken(user._id)
            const {password:pass,...rest}=user._doc
            res.status(200).json({token,rest})
        }else {
           return next({stausCode:400,message:'Invalid Password'})
        }

        
    } catch (error) {
        next(error)
    }
}



export default {
    SignUp,
    signIn
}