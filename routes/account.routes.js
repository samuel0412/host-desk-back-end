module.exports = (app) => {
  Authorization = require("../middleware/isAuth");
  contactUs = require("../controllers/account.controller");
  contactUsRouter = require("express").Router();

  contactUsRouter.post("/create", contactUs.createAccount);

  app.use("/accounts", contactUsRouter);
};
