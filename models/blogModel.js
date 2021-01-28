const mongoose = require("mongoose");
const Joi = require("joi");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 6,
    maxlength: 200,
    required: [true, "Mesaage must have a title"],
  },
  body: {
    type: String,
    min: 6,
    max: 4000,
    required: [true, "Message must have a body"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.model("Blog", blogSchema);

// validate function with Joi
function validateMessage(message) {
  const schema = Joi.object({
    title: Joi.string().min(6).max(200).required(),
    body: Joi.string().min(6).max(4000).required(),
  });

  return schema.validate(message);
}
module.exports = {
  Blog,
  validateMessage,
};
