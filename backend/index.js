const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require('cors');
require("dotenv").config();  //According to the dotenv documentation you should add require('dotenv').config(); early as possible in your application, require and configure dotenv".
const mongoose = require("mongoose");
require("./mongoDB");
require("./models/userModel")
app.use(cors());


app.use(express.json());
app.use(require("./routes/auth.js"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/messagesRoute"));


const server = app.listen(process.env.PORT,(req,resp)=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
});

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id)
    });

    socket.on("send-msg",(data)=>{
        const senduserSocket = onlineUsers.get(data.to);
        if(senduserSocket){
            socket.to(senduserSocket).emit("msg-recieve", data.msg)
        }
    });
});