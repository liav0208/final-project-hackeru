const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 144,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: [true, "User must have an email"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: [true, "User must have an Password"],
  },
  passwordConfirm: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: [true, "You must confrirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password not equal",
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
  },
  academicInstitution: {
    type: String,
    minlength: 3,
    maxlength: 200,
  },
  about: {
    type: String,
    minlength: 10,
    maxlength: 1000,
  },
  messages: {
    type: Array,
  },
  userPhoto: {
    type: String,
    default: "default.jpg",
  },
  lessons: Array,
  favoriteTeachers: Array,
  followerStudents: [{ type: mongoose.Schema.Types.ObjectId }],
  followerStudentsLength: {
    type: Number,
    default: 0,
  },
  outbox: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  inbox: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

// hash password before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  next();
});

// save user name with first letter upper case
userSchema.pre("save", function (next) {
  this.name = this.name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  next();
});

//create user token
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      role: this.role,
      name: this.name,
      userPhoto: this.userPhoto,
    },
    process.env.JWT_SECRET
  );
  return token;
};

//check password with bcrypt
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

// validate Signing user
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(144).required(),
    email: Joi.string().min(6).max(1024).required(),
    password: Joi.string().min(6).max(1024).required(),
    passwordConfirm: Joi.string()
      .min(6)
      .max(1024)
      .required()
      .valid(Joi.ref("password")),
    role: Joi.string().valid("teacher", "student").required(),
    academicInstitution: Joi.when("role", {
      is: "teacher",
      then: Joi.string().min(3).max(200).required(),
    }),
    about: Joi.when("role", {
      is: "teacher",
      then: Joi.string().min(10).max(1000).required(),
    }),
    dateOfBirth: Joi.date().required(),
  });

  return schema.validate(user);
}

//validate Edit student
function validateEditStudent(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(144).required(),
    email: Joi.string().min(6).max(1024).required(),
    dateOfBirth: Joi.date().required(),
  });

  return schema.validate(user);
}

// validate Edit teacher
function validateEditTeacher(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(144).required(),
    email: Joi.string().min(6).max(1024).required(),
    dateOfBirth: Joi.date().required(),
    academicInstitution: Joi.string().min(3).max(200).required(),
    about: Joi.string().min(10).max(1000).required(),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
  validateEditStudent,
  validateEditTeacher,
};
