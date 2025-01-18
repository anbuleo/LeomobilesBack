import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


let Salt = process.env.SALT

export const hashPassword  = async(pass)=>{
    try {
        let hash =  bcryptjs.hashSync(pass,Number(Salt))
        return hash
    } catch (error) {
        next(401,'bcryptError')
    }
}

export const hashCompare = async(pass,hash) => {
    return await bcryptjs.compare(pass,hash)
}

const decodeToken = async(token)=>{
    const payload = await jwt.decode(token)
    return payload
}

export const createToken = async(payload) => {
    const token = await jwt.sign({payload},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXP
    })
    return token
}


export const validate = async(req,res,next) => {
    let token = req.headers.authorization?.split(" ")[1]
    // console.log(token)
    if(token){
        let payload = await decodeToken(token)
        let currentTime = (+new Date())/1000

        if(currentTime < payload.exp){
            next()
        }else{
              next({statusCode:400,message:'Token EXpried login again'})
        }

    }else {
        next({statusCode:400,message:"No Token Found"})
    }
}

export const validateSentres = async(req,res,next) => {
    let token = req.headers.authorization?.split(" ")[1]
    // console.log(token)
    if(token){
        let payload = await decodeToken(token)
        let currentTime = (+new Date())/1000

        if(currentTime < payload.exp){
           res.status(200).json({message:'verified'})
        }else{
              next({statusCode:400,message:'Token EXpried login again'})
        }

    }else {
        next({statusCode:400,message:"No Token Found"})
    }
}
