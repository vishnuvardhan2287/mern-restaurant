const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signUpController = async (req,res) =>{
    const {userName,email,password} = req.body;

    try {
       const user = await User.findOne({email});
       if(user){
           return res.status(400).json({
               errorMessage:'Email already exists!!'
           })
       }

       const newUser = new User({userName,email,password})
       const salt = await bcrypt.genSalt(10);
       newUser.password = await bcrypt.hash(password,salt);
       await newUser.save();

       res.json({
           successMessage: "Registration Successful! Please SignIn"
       })
    } catch (err) {
        console.log('SignUpController error : ', err);
        res.status(500).json({
            errorMessage:'Server Error'
        })
    }
}