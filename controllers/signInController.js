const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret,jwtExpire} = require('../config/keys');

exports.signInController = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errorMessage:'Invalid Credentials'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                errorMessage:'Invalid Credentials'
            })
        }

        const payload ={
            user:{
                _id: user._id
            }
        }

        jwt.sign(payload,jwtSecret,{expiresIn: jwtExpire},(err,token) =>{
            if(err) throw err;
            const {_id,email,userName,role} = user;
            res.json({
                token,
                user: {_id,userName,email,role}
            })
        })

    } catch (err) {
        console.log('SignIn Controller Error ', err);
        res.status(500).json({
            errorMessage:'Server Error'
        })
    }
}