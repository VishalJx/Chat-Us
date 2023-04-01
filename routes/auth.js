const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const USER = mongoose.model('USER');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;
const userControl = require("../controller/userControl");

router.post("/register",(req,resp)=>{
    const {email, username, password} = req.body;
    if(!email ||!username || !password){
        resp.status(422).json({error:"Please add all the fields !!"});
    }

    USER.findOne({$or:[{email:email},{username:username}]}).then((savedUser)=>{
        if(savedUser){
            return resp.status(422).json({error:"User already exists"});
        }

        bcrypt.hash(password,12).then((hashedPassword)=>{
        const user = new USER({
            email,
            username,
            password:hashedPassword
        });
        user.save()
        .then(message=>{resp.json({message:"Registered Successfully"})})
        .catch(err=>{console.log(err)})
        })
    })

});

router.post('/login',(req,resp)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return resp.status(422).json({error:"Please fill all data"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return resp.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password,savedUser.password)
        .then((match)=>{
            if(match){
                //return resp.status(200).json({message:"Signed in successfully"});
                const token = jwt.sign({_id:savedUser.id},jwt_secret);
                const { _id, email, username, profile } = savedUser
                resp.status(200).json({ token, user: { _id, email, username, profile },message:"Signed in successfully"})
            }else{
                return resp.status(422).json({error:"Invalid password"});
            }

        }).catch(err=>console.log(err));
    })
});

module.exports = router;