const { response } = require('express');
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const USER = mongoose.model('USER');
const userControl = require("../controller/userControl");

// to get users profile
router.get('/users',userControl,(req, resp,) => {
    USER.find({})   //to find all data in mongoDB
    .select("-password")
    .then(user=>{
        return resp.status(200).json(user)
    })
    .catch(err=>{
        resp.status(404).json({error:"User not found !"});
    })
})

module.exports = router;
