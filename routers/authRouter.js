const router = require("express").Router();
const authCotroller = require("../controller/authController");

// endpoint for sign in
router.route("/signin").post(authCotroller.signin);

module.exports = router;
