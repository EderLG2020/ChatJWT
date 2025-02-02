const express = require("express");
const {listUser}= require("../controller/userController")
const router = express.Router();

router.get("/listUser", listUser) 

module.exports = router;
