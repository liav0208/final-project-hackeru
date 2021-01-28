const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const authRouter = require("./routers/authRouter");
const lessonRouter = require("./routers/lessonRouter");
const blogRouter = require("./routers/blogRoute");
const searchRouter = require("./routers/searchRouter");
const messageRouter = require("./routers/messagesRouter");
dotenv.config({ path: `${__dirname}/config.env` });

//Database connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connect to mongo Succefully"))
  .catch(() => console.log("Server could not connect DB"));

//App global middleware
if (process.env.ENVIROMENT === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// api Route
app.use("/api/blog", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/search", searchRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => console.log(`click http://localhost:${PORT}`));
