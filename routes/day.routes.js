module.exports = (app) => {
  Authorization = require("../middleware/isAuth");
  const days = require("../controllers/day.controller");
  const daysRouter = require("express").Router();

  daysRouter.get("/all", Authorization, days.getAllDays);

  app.use("/days", daysRouter);
};
