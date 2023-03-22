const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();  //According to the dotenv documentation you should add require('dotenv').config(); early as possible in your application, require and configure dotenv".
const mongoose = require("mongoose");
require("./mongoDB");
require("./models/userModel")
app.use(cors());


app.use(express.json());
app.use(require("./routes/auth.js"))
app.use(require("./routes/userRoutes"))


app.listen(process.env.PORT,(req,resp)=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
})