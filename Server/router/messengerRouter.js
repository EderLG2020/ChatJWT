const express = require("express");
const { listMessengerForFriend, addMessengerForFriend, listConversation } = require("../controller/conversationController")
const router = express.Router();

router.post("/friend/list", listMessengerForFriend)
router.post("/friend/addFriend", addMessengerForFriend)
router.post("/conversation/listforUser", listConversation)

module.exports = router;
