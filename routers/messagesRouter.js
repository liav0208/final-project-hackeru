const router = require("express").Router();
const messageController = require("../controller/messageController");
const auth = require("../middleware/auth");

//send new message
router.post("/send", auth, messageController.sendMessage);

//get user inbox messages
router.get("/inbox", auth, messageController.getInboxMessages);

//get user outbox messages
router.get("/outbox", auth, messageController.getOutboxMessages);

module.exports = router;
