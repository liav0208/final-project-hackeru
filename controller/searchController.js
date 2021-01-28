const { User } = require("../models/userModels");
const { Lesson } = require("../models/lessonsModel");

// find 5 users and 5 lessons with the searched query
exports.searchBox = async (req, res) => {
  // get 5 teachers by query
  const users = await User.find({
    name: new RegExp(req.query.search, "i"),
    role: "teacher",
  }).limit(5);

  // get 5 lesson by query
  const lessons = await Lesson.find({
    title: new RegExp(req.query.search, "i"),
  }).limit(5);

  if (!users.length && !lessons.length)
    return res.status(400).send("No match found");

  res.status(200).json({
    length: lessons.length + users.length,
    users,
    lessons,
  });
};

// find lessons where either name or teacher inclue params
exports.findLessonsByAuery = async (req, res, next) => {
  const params = req.params.query;

  // if no query return all lessons
  if (params === "*") {
    const lessons = await Lesson.find();
    return res.status(200).send(lessons);
  }

  let lessons = await Lesson.find({
    teacher: { $regex: params, $options: "i" },
  });
  lessons.push(
    await Lesson.find({
      title: { $regex: params, $options: "i" },
    })
  );

  // set lessons to be without duplicate lessons
  lessons = lessons
    .flat()
    .filter((item, index) => lessons.indexOf(item) === index);

  res.send(lessons);
};
