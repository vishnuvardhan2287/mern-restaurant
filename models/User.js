const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: Number,
        default:0
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('users', userSchema);