const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
  },
  fromName: {
    type: String,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
  },
  toName: String,
  title: {
    type: String,
    minlength: 6,
    maxlength: 60,
    required: true,
  },
  body: {
    type: String,
    minlength: 10,
    maxlength: 1000,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

// Validate message schema with Joi function
const validateMessage = (message) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(60).required(),
    body: Joi.string().min(10).max(1000).required(),
  });

  return schema.validate(message);
};

module.exports = {
  Message,
  validateMessage,
};
