module.exports = (app) => {
  Authorization = require("../middleware/isAuth");
  contactUs = require("../controllers/contactUs.controller");
  contactUsRouter = require("express").Router();
  const multer = require("multer");
  const multerMiddleware = multer({ destination: "/tmp", preservePath: true });

  contactUsRouter.post(
    "/create",
    multerMiddleware.single("file"),
    contactUs.createContactUs
  );
  contactUsRouter.get("/list", Authorization, contactUs.contactUsList);
  contactUsRouter.delete("/:id", Authorization, contactUs.deleteContactUs);

  app.use("/contactUs", contactUsRouter);
};
