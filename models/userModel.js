const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:4,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        max:50
    },
    password:{
    type:String,
    required: true,
    },
    profile:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    }
});

module.exports = mongoose.model("USER",userSchema);