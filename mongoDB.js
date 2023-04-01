const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connect = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected");
});

module.exports = connect;