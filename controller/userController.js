const {
  User,
  validateUser,
  validateEditStudent,
  validateEditTeacher,
} = require("../models/userModels");
const multer = require("multer");

// set where to save uploaded image and how to call it
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

// set how to filter which file is ok to upload
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("error", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// set an upload file middleware
exports.uploadUserPhoto = upload.single("userPhoto");

//upload image
exports.uploadImage = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    userPhoto: req.file.filename,
  });
  res.send("userUploaded");
};

//Sign up user
exports.signup = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(req.body);
  await user.save();
  res.send(user);
};

//delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  if (!user) return res.status(400).send("Something went wrong");

  res.status(203).send(user);
};

// get loged user details
exports.getLogedUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
};

// update user details
exports.updateStudentProfile = async (req, res) => {
  if (req.user.role === "student") {
    const { error } = validateEditStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  } else {
    const { error } = validateEditTeacher(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  }

  // set the name with first letter capital
  req.body.name = req.body.name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

    // varified edited user email
  const invalidEmail = await User.findOne({ email: req.body.email });
  if (invalidEmail && invalidEmail._id != req.user._id) {
    return res.status(400).send("Email is taken");
  }
  const user = await User.findByIdAndUpdate(req.user._id, req.body);

  res.status(200).send(user);
};

//get most new Teachers
exports.getTeachers = async (req, res) => {
  const teachers = await User.find({ role: "teacher" })
    .skip(+req.query.skip)
    .limit(4)
    .sort("-createdAt");

  if (!teachers.length) return res.status(400).send("No Teachers Found");

  res.status(200).send(teachers);
};

//get teacher details by id
exports.getUserById = async (req, res) => {
  const user = await User.findOne({
    role: "teacher",
    _id: req.params.id,
  }).select("-password");
  if (!user) return res.status(400).send("Coult not find user");

  res.status(200).send(user);
};

// toggle favorite teacher
exports.saveTeachersToFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  let updatedUser;
  if (!user.favoriteTeachers.includes(req.params.id)) {
    // add teacher id to user favorite teachers list
    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { favoriteTeachers: req.params.id },
      },
      { new: true }
    );
    
    //add to teacher DB the student id
    const user = await User.findByIdAndUpdate(req.params.id, {
      $push: {
        followerStudents: req.user._id,
      },
    });
  } else {
    // pull teacher id to user favorite teachers list
    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { favoriteTeachers: req.params.id },
      },
      { new: true }
    );

    // pull teacher id to user favorite teachers list
    await User.findByIdAndUpdate(req.params.id, {
      $pull: {
        followerStudents: req.user._id,
      },
    });
  }
  res.status(200).send(updatedUser);
};

//get favorite teachers
exports.getFavoriteTeachers = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const teachersId = user.favoriteTeachers;
  const teachers = await User.find({ _id: { $in: teachersId } });
  res.status(200).send(teachers);
};

//get teachers sorted by most liked
exports.mostLikedTeachers = async (req, res, next) => {
  const limit = +req.query.limit || 100;
  let teachers = await User.find({ role: "teacher" })
    .sort("-followerStudents")
    .limit(limit);

  teachers.sort(function (a, b) {
    return b.followerStudents.length - a.followerStudents.length;
  });

  res.status(200).send(teachers);
};

