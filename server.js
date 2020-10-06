const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./database/db');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

connectDb();

const port = process.env.PORT || 5000;

app.listen(port,() =>{
    console.log(`listening on port: ${port}`)
})