const router = require("express").Router();
const auth = require("../middleware/auth");
const lessonController = require("../controller/lessonController");

// get lessons
router.get("/", auth, lessonController.getLessons);

// get lesson who created by the logged teacher
router.get("/my-lessons", auth, lessonController.getMyLessons);

//create new lesson
router.post("/create-lesson", auth, lessonController.createLesson);

// delete lesson by id
router.delete("/:id", auth, lessonController.deleteLesson);

// upadte lesson by id
router.put("/update/:id", auth, lessonController.updateLesson);

//get lesson by id
router.get("/:id", auth, lessonController.getLessonById);

//get teacher lessons by teacher id
router.get("/teacher-lessons/:id", auth, lessonController.getLessonByTeacher);

module.exports = router;
