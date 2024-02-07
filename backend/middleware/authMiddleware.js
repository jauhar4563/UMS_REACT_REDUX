const jwt = require('jsonwebtoken');
const asynHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asynHandler(async(req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from Header
            token = req.headers.authorization.split(' ')[1]
            // Verify token
            req.token = token;
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // get user from token
            req.user = await User.findById(decoded.id).select('-password')
            next();
        }catch(error){
            console.log(error.message);
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized') 
    }
})
const protectAdmin= asynHandler(async(req,res,next)=>{
    let token 
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]
    
            //verify
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
            //GET admin from token
            req.admin=await User.findById(decoded.id).select('-password')
    
            next()
        }catch(error){
         console.log(error);
         res.status(401)
         throw new Error("Not authorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("No token")
    }
    })

module.exports = { protect,protectAdmin }