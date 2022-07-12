const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secreteKey = process.env.JWT_SECREATE_KEY;

exports.signUp = async (req, res)=>{
    
    try {
        let isLogStatus = false;
        let user = await User.findOne({email:req.body.email});
        if(user){
          return res.status(400).json({isLogStatus:false, error:'User email already exists'});
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
    
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
          })

          const data = {
            id:user.id,
            name:user.name,
            email:user.email
          }
      
          const authToken = jwt.sign(data, secreteKey);
      
          return res.status(200).json({isLogStatus:true, success:"User created successfully", authToken:authToken})
      } catch (error) {
          console.log(error.message)
          res.status(500).send('Internal Server Error');
      }
}

exports.signIn = async (req, res)=>{
  try{
    const {email, password} = req.body;
    let isLogStatus = false;

    console.log();

    let user = await User.findOne({email:email});
    if(!user){
      return res.status(400).json({isLogStatus:false, error:'Email does not exists'});
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare){
      return res.status(400).json({isLogStatus:false, error:'Please try to login correct credientails'});
    }

    const data = {
      id:user.id,
      name:user.name,
      email:user.email
    }

    const authToken = jwt.sign(data, secreteKey);

    return res.status(200).json({isLogStatus:true, success:"User Logged in successfully", authToken:authToken})
  } catch (error){
    console.log(error.message)
    res.status(500).send('Internal Server Error');
  }
}
