const jwt = require("jsonwebtoken");

// auth user middleware
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  //check if there is a token in the request
  if (!token) return res.status(400).send("An invalid token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // save the user details from the token to re.user
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
