const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

const router = (app) => {
  app.use("/", authRouter);
  app.use("/", userRouter);
};

module.exports = router;
