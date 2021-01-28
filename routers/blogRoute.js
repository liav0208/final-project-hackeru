const router = require("express").Router();
const auth = require("../middleware/auth");
const blogController = require("../controller/blogController");

// endpoint for create message
router.post("/create-message", auth, blogController.createMessage);

// endpoint to get messages
router.get("/", auth, blogController.getAllMessages);

module.exports = router;
