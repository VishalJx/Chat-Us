const express = require('express')
const router = express.Router();
const {addMsg, getAllMsg} = require("../controller/messagesController");

router.post("/addmsg",addMsg);
router.post("/getmsg",getAllMsg);

module.exports = router;
