const mongoose = require("mongoose");
const Joi = require("joi");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 6,
    maxlength: 100,
    required: [true, "Lesson must have a title"],
  },
  description: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: [true, "Lesson must have a description"],
  },
  duration: {
    type: Number,
    min: 45,
    required: true,
  },
  price: {
    type: Number,
    min: 40,
    max: 100,
    default: 40,
  },
  lessonType: {
    type: String,
    enum: ["private", "group", "open-class"],
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  teacher: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  topic: {
    type: String,
    enum: [
      "Computer and machines",
      "School subjects",
      "Sport",
      "Cooking",
      "Hobbies",
      "Other",
    ],
    required: true,
  },
  bgImage: String,
});

// set a background image for the lesson with mongoose pre save
lessonSchema.pre("save", function (next) {
  console.log(this.topic);
  switch (this.topic) {
    case "Computer and machines":
      this.bgImage = "computer-and-machines.jpeg";
      break;
    case "School subjects":
      this.bgImage = "school-subjects.jpeg";
      break;
    case "Sport":
      this.bgImage = "sport.jpeg";
      break;
    case "Cooking":
      this.bgImage = "cooking.jpeg";
      break;
    case "Hobbies":
      this.bgImage = "hobbies.jpeg";
      break;
    case "Other":
      this.bgImage = "other.jpg";
      break;
    default:
      this.bgImage = "other.jpg";
  }

  next();
});

const Lesson = mongoose.model("Lesson", lessonSchema);

// validate lesson schema with JOi
function validateLesson(lesson) {
  const schema = Joi.object({
    title: Joi.string().min(6).max(100).required(),
    description: Joi.string().min(6).max(1024).required(),
    duration: Joi.number().min(45).required(),
    price: Joi.number().min(40).max(100).allow(""),
    lessonType: Joi.string().valid("private", "group", "open-class").required(),
    topic: Joi.string()
      .valid(
        "Computer and machines",
        "School subjects",
        "Sport",
        "Cooking",
        "Hobbies",
        "Other"
      )
      .required(),
  });

  return schema.validate(lesson);
}

module.exports = {
  Lesson,
  validateLesson,
};
