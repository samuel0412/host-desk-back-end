require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const isAuthenticated = (request, response, next) => {
  const bearerHeader = request.headers["authorization"];
  request.timezone = request.headers["timezone"];

  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    //Verify token
    jwt.verify(bearerToken, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return response
          .status(403)
          .json({ msg: "You have no authorization to access this property." });
      }
      request.userId = decoded.id;
      const userData = await User.findByPk(decoded.id);
      request.accountId = userData.accountId;
      //Next middleware
      next();
    });
  } else {
    //Forbidden
    response
      .status(403)
      .json({ msg: "You have no authorization to access this property." });
  }
};
module.exports = isAuthenticated;
