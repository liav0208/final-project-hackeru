const router = require("express").Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

//signup user
router.post("/signup", userController.signup);

// upload user image
router.post(
  "/upload-user-image",
  auth,
  userController.uploadUserPhoto,
  userController.uploadImage
);

//get user details
router.get("/me", auth, userController.getLogedUser);

//show teachers
router.get("/teachers", auth, userController.getTeachers);

// get teacher details
router.get("/teacher-profile/:id", auth, userController.getUserById);

//delete user
router.delete("/delete", auth, userController.deleteUser);

//update user
router.put("/update-me", auth, userController.updateStudentProfile);

//get saved to favorite lessons
router.get("/favorite", auth, userController.getFavoriteTeachers);

//get most liked teachers
router.get("/most-liked-teachers", auth, userController.mostLikedTeachers);

//toggle lesson favorite
router.patch("/save-teacher/:id", auth, userController.saveTeachersToFavorite);

module.exports = router;
