const { Lesson, validateLesson } = require("../models/lessonsModel");
const { User } = require("../models/userModels");

// create new lesson
exports.createLesson = async (req, res, next) => {
  // validate lesson body
  const { error } = validateLesson(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    lessonType: req.body.lessonType,
    teacher: req.user.name,
    user_id: req.user._id,
    topic: req.body.topic,
  });
  await lesson.save();

  // add lesson id to teacher DB lessons array
  await User.findByIdAndUpdate(req.user._id, {
    $push: { lessons: lesson._id },
  });
  res.status(201).send(lesson);
};

// get lessons
exports.getLessons = async (req, res, next) => {
  let topic = req.query.topic || "";
  const limit = +req.query.limit || 100;
  const skip = +req.query.skip || 0;

  topic = topic.split("-").join(" ");
  let lessons;
  if (topic)
    lessons = await Lesson.find({ topic: topic })
      .limit(limit)
      .sort("-createAt")
      .skip(skip);
  else lessons = await Lesson.find().limit(limit).skip(skip).sort("-createAt");
  if (!lessons.length) return res.status(400).send("Sorry, no lesson valid");

  res.status(200).json({
    status: "success",
    length: lessons.length,
    lessons,
  });
};

// remove lesson
exports.deleteLesson = async (req, res, next) => {
  const lessonId = req.params.id;
  const userId = req.user._id;

  const lesson = await Lesson.findOneAndDelete({
    _id: lessonId,
    user_id: userId,
  });
  if (!lesson)
    return res.status(400).send("You not allowed to remove this lesson");

  res.status(203).send(lesson);
};

//update lesson
exports.updateLesson = async (req, res, next) => {
  const { error } = validateLesson(req.body);
  if (error) return res.send(error.details[0].message);

  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body);
  if (!lesson) return res.status(400).send("No lesson with that ID was found");

  res.status(200).send("Lesson updated");
};

// get lessons by log in user id
exports.getMyLessons = async (req, res, next) => {
  const lessons = await Lesson.find({ user_id: req.user._id });
  if (lessons.length === 0) return res.status(400).send("No lessons found");

  res.status(200).send(lessons);
};

// find lesson by lesson id
exports.getLessonById = async (req, res, next) => {
  const lesson = await Lesson.findOne({ _id: req.params.id });
  if (!lesson) return res.status(400).send("No lesson with that ID was found");
  res.status(200).send(lesson);
};

// find lesson by teacher id
exports.getLessonByTeacher = async (req, res, next) => {
  const lessons = await Lesson.find({ user_id: req.params.id });
  // if (lessons.length === 0) return res.status(400).send("No lessons yet");
  res.status(200).send(lessons);
};
