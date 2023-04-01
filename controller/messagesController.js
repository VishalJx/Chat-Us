const mongoose = require('mongoose');
const messageModel = require('../models/messageModel');

module.exports.addMsg =async(req,resp,next)=>{
try {
    const {from, to, message} = req.body;
    const data = await messageModel.create({
        message :{text:message},
        users:[from, to],
        sender:from,
    });
    if(data) return resp.json({msg :"Message added successfully."});
    return resp.json({msg:"Failed to add message to database."});
} catch (ex) {
    next(ex);
}
};
module.exports.getAllMsg =async(req,resp,next)=>{
    try {
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all :[from, to],
            },
        }).sort({updatedAt : 1 });
        const projectedMessages = messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString()===from,
                message: msg.message.text,
            };
        });
        resp.json(projectedMessages)
    } catch (ex) {
        next(ex);
    }
}