module.exports = (app) => {
  const Authorization = require("../middleware/isAuth");
  const users = require("../controllers/user.controller");
  const userRouter = require("express").Router();

  // user auth routes
  userRouter.post("/signUp", Authorization, users.signUp);
  userRouter.post("/login", users.logIn);
  userRouter.post("/reset", users.reset);
  userRouter.post("/resetCodeSubmit", users.resetCodeSubmit);
  userRouter.post("/resetPassword", users.resetPassword);

  // user routes
  userRouter.patch(
    "/deactivateUser/:userId",
    Authorization,
    users.makeUserDeactive
  );
  userRouter.get("/list", Authorization, users.getUserList);
  userRouter.put("/edit", Authorization, users.editUser);

  app.use("/users", userRouter);
};
