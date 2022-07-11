const User = require('../models/Users');
const bcrypt = require('bcryptjs');

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
      
          return res.status(200).json({isLogStatus:true, success:"User created successfully"})
      } catch (error) {
          console.log(error.message)
          res.status(500).send('Some error occured');
      }
}
