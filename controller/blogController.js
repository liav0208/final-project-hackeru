const { Blog, validateMessage } = require("../models/blogModel");
const { User } = require("../models/userModels");

// create message middleware
exports.createMessage = async (req, res) => {

  //validate message body
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const message = new Blog({
    title: req.body.title,
    body: req.body.body,
    user_id: req.user._id,
    author: req.user.name,
  });

  // add post id to user database to posts array
  const user = await User.findByIdAndUpdate(req.user._id, {
    $push: { messages: req.params.id },
  });

  await message.save();

  res.status(200).send(message);
};

// get messages middleware
exports.getAllMessages = async (req, res) => {
  const skip = +req.query.skip || 0;
  const messages = await Blog.find().skip(skip).limit(4).sort("-createdAt");

  res.status(200).send(messages);
};
