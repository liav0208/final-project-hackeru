const { Message, validateMessage } = require("../models/messageModel");
const { User } = require("../models/userModels");

exports.sendMessage = async (req, res, next) => {
  const { error } = validateMessage({
    title: req.body.title,
    body: req.body.body,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const message = new Message({
    from: req.user._id,
    fromName: req.user.name,
    to: req.body.senderId,
    title: req.body.title,
    body: req.body.body,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { outbox: message._id },
  });
  const getterUser = await User.findByIdAndUpdate(req.body.senderId, {
    $push: { inbox: message._id },
  });

  message.toName = getterUser.name;

  message.save();

  return res.status(200).send(message);
};

exports.getInboxMessages = async (req, res, next) => {
  const skip = +req.query.skip || 0;

  const messages = await Message.find({ to: req.user._id })
    .sort("-createdAt")
    .skip(skip)
    .limit(5);
  if (!messages.length) return res.status(400).send("No message found");

  res.status(200).send(messages);
};

exports.getOutboxMessages = async (req, res, next) => {
  const skip = +req.query.skip || 0;
  const limit = +req.query.limit || 5;
  const messages = await Message.find({ from: req.user._id })
    .sort("-createdAt")
    .limit(limit)
    .skip(skip);
  if (!messages.length) return res.status(400).send("No message found");

  res.status(200).send(messages);
};
