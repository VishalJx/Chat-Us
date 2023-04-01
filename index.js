const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require('cors');
require("dotenv").config();  //According to the dotenv documentation you should add require('dotenv').config(); early as possible in your application, require and configure dotenv".
const mongoose = require("mongoose");
require("./mongoDB");
require("./models/userModel")
app.use(cors());
const path = require("path");
const PORT = process.env.PORT||5000

app.use(express.json());
app.use(require("./routes/auth.js"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/messagesRoute"));

app.use(express.static(path.join(__dirname, "./frontend/build")))
app.get('*',(req,resp)=>{
    resp.sendFile(
        path.join(__dirname,'./frontend/build/index.html'),
        function (err){
            resp.status(500).send(err)
        }
            
    )
})

const server = app.listen(PORT,(req,resp)=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
});

const io = socket(server,{
    cors:{
        origin:"*",
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