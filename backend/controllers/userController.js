const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');


const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new Error('Please add fields')
    }
    console.log(name,email,password)
    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error('User already exists')
    }
    
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    // Create user
    const user = await User.create({
        name, 
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
      res.status(400)
      throw new Error('Invalid user data')      
    }
    res.json({message:'Register user'})
})


const loginUser = asyncHandler(async(req,res)=>{
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if(user){
        if (user.isBlock) {
            res.status(400)
            throw new Error('User is blocked')
          }
    }
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            profileUrl:user.profileUrl,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})
//edit user
const editUser=asyncHandler(async(req,res)=>{
    const {userId,name,email}=req.body
    const user=await User.findByIdAndUpdate(userId,{name,email},{new:true})
   
    if(user){
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          profileUrl: user.profileUrl,
          token: req.token
        })
    }else{
        res.status(404)
        throw new Error('User not Found')
    }
  })

const getMe = asyncHandler(async(req,res)=>{
    const {_id, name, email,profileUrl} = await User.findById(req.user.id);
    res.status(200).json(req.user)
})

// Update profile

const profileUpload = asyncHandler(async (req, res) => {
    const url = req.body.url;
    console.log("Hello",req.user._id)
    const user = await User.findByIdAndUpdate(req.user._id, {
      profileUrl: url
    }, { new: true });
  
    
    res.status(200).json(user);
  });

// Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    editUser,
    profileUpload
}