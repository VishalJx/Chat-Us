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
});

router.put("/uploadProfile",userControl, (req, resp) => {
    USER.findByIdAndUpdate(req.user._id,{
        $set:{profile:req.body.pic}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return resp.status(422).json({error:err});
        }else{
            resp.json(result);
        }
    })
})

module.exports = router;
