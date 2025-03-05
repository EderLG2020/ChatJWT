const express = require("express");
const { listMessengerForFriend, addMessengerForFriend, listConversation, listFriendConversation } = require("../controller/conversationController")
const router = express.Router();

router.post("/friend/list", listMessengerForFriend)
router.post("/friend/addFriend", addMessengerForFriend)
router.post("/friend/listFrind", listFriendConversation)
router.post("/conversation/listforUser", listConversation)

module.exports = router;
