const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect(
            'mongodb+srv://mern-restaurant:Vinitha_21@cluster0.5xcgb.mongodb.net/<dbname>?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            console.log('DB Connected!')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB