const { User } = require("../models/userModels");
const Joi = require("joi");

// validate with Joi the request body
function validateSignIn(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(1024).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
}

exports.signin = async (req, res, next) => {
  //validate body
  console.log(req.body);
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if there is an user
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email or password invalid");

  //check if password correct
  const correctPassword = await user.comparePassword(
    req.body.password,
    user.password
  );
  if (!correctPassword)
    return res.status(400).send("email or password invalid");

  res.status(200).json({ token: user.generateToken() });
};
