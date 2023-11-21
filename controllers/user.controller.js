const { User, ResetToken } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  signupSchema,
  loginSchema,
  resetSchema,
  resetCodeSubmitSchema,
  resetPasswordSchema,
  userUpdateSchema,
} = require("./validation/user.validation");
const { Op } = require("sequelize");

// Create and a User
exports.signUp = async (request, response) => {
  const body = request.body;
  const { error } = signupSchema.validate(request.body);
  if (error) {
    response.status(200).json({ ack: 1, msg: error.details[0].message });
    return;
  }
  try {
    const checkForIfExists = await User.findOne({
      where: { email: body.email },
    });
    if (checkForIfExists) {
      return response.status(200).json({
        ack: 0,
        msg: "User exists with this email",
      });
    } else {
      const hash = bcrypt.hashSync(body.password, 10);
      const userRecord = {
        ...body,
        password: hash,
        isActive: 1,
        isAdmin: 0,
        accountId: request.accountId,
      };
      const userData = await User.create(userRecord);
      const token = jwt.sign(
        { id: userData.dataValues.id },
        process.env.SECRET_KEY,
        {
          algorithm: process.env.JWT_ALGORITHM,
          expiresIn: process.env.EXPIRES_IN,
        }
      );
      delete userData.dataValues.password;

      response.status(200).json({
        ack: 1,
        msg: "Successfully Created",
        data: {
          user: userData,
          //  token: token,
        },
      });
    }
  } catch (error) {
    console.error("Error => ", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};

// login
exports.logIn = async (request, response) => {
  const body = request.body;
  try {
    const { error } = loginSchema.validate(body);
    if (error) {
      response.status(200).json({ ack: 0, msg: error.details[0].message });
      return false;
    }
    const checkForIfExists = await User.findOne({
      where: { email: body.email },
    });
    if (checkForIfExists) {
      if (!checkForIfExists?.dataValues?.isActive) {
        response.status(200).json({
          ack: 0,
          msg: "User disabled, Please contact us through our website",
        });
        return false;
      }
      if (
        bcrypt.compareSync(
          body.password,
          checkForIfExists?.dataValues?.password
        )
      ) {
        const token = jwt.sign(
          { id: checkForIfExists.dataValues.id },
          process.env.SECRET_KEY,
          {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: process.env.EXPIRES_IN,
          }
        ); // expires in 30 days
        delete checkForIfExists.dataValues.password;
        response.status(200).json({
          ack: 1,
          msg: "Logged in Successfully",
          data: { user: checkForIfExists, token },
        });
      } else {
        response.status(200).json({
          ack: 0,
          msg: "Invalid email or password",
        });
      }
    } else {
      response.status(200).json({
        ack: 0,
        msg: "Email ID not registered",
      });
    }
  } catch (error) {
    console.error("Error => ", error);
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};

// reset code
exports.reset = async (request, response) => {
  const { error } = resetSchema.validate(request.body);
  if (error) {
    response.status(200).json({ ack: 0, msg: error.details[0].message });
  } else {
    try {
      const user = await User.findOne({
        where: { email: request.body.email, isActive: 1 },
      });
      if (!user) {
        response.status(200).json({ ack: 0, msg: "User not Found" });
        return;
      }
      const token = Math.floor(10000 + Math.random() * 90000);
      ResetToken.create({ userId: user.dataValues.id, token });

      const body = "Your password " + token;
      const msg = {
        to: user.email,
        subject: "Welcome to Ferring",
        body,
      };
      //sendMailBySmtp(msg);
      response.status(200).json({
        ack: 1,
        data: {},
        msg: "OTP send",
      });
    } catch (error) {
      console.log("error", error);
      response
        .status(500)
        .json({ ack: 0, msg: error.message || "Server error" });
    }
  }
};

// reset code submit
exports.resetCodeSubmit = async (request, response) => {
  const { error } = resetCodeSubmitSchema.validate(request.body);
  if (error) {
    response.status(200).json({ ack: 0, msg: error.details[0].message });
  } else {
    try {
      const token = await ResetToken.findOne({
        where: { token: request.body.code, isActive: 1 },
      });
      if (!token) {
        response.status(200).json({ ack: 0, msg: "Code not Found" });
        return;
      }
      response.status(200).json({
        ack: 1,
        msg: "Code verified",
      });
    } catch (error) {
      console.log("error", error);
      response
        .status(500)
        .json({ ack: 0, msg: error.message || "Server error" });
    }
  }
};

// reset password
exports.resetPassword = async (request, response) => {
  const { error } = resetPasswordSchema.validate(request.body);
  if (error) {
    response.status(200).json({ ack: 0, msg: error.details[0].message });
  } else {
    try {
      const token = await ResetToken.findOne({
        where: { token: request.body.code, isActive: 1 },
      });
      if (token === null) {
        response.status(200).json({ ack: 0, msg: "Code not Found" });
        return;
      }
      const hash = bcrypt.hashSync(request.body.password, 10);
      User.update(
        {
          password: hash,
        },
        {
          where: {
            id: token.dataValues?.userId,
          },
        }
      );
      ResetToken.update(
        {
          isActive: false,
        },
        {
          where: {
            id: token.dataValues.id,
          },
        }
      );
      response.status(200).json({
        ack: 1,
        data: {},
        msg: "password changed successfully",
      });
    } catch (error) {
      console.log("error", error);
      response
        .status(500)
        .json({ ack: 0, msg: error.message || "Server error" });
    }
  }
};

// user Deactive
exports.makeUserDeactive = async (request, response) => {
  const id = request.params.userId;
  const userId = request.userId;
  try {
    const userData = await User.findByPk(id);

    if (!userData) {
      response.status(500).json({ ack: 0, msg: `invalid  userId` });
      return;
    }
    if (id == userId) {
      response.status(500).json({ ack: 0, msg: `You can't deactive your a/c` });
      return;
    }
    const userDeactive = await User.update(
      { isActive: !userData.isActive },
      { where: { id } }
    );
    response.status(200).json({
      ack: 1,
      msg: `User Successfully Deactivated `,
      data: userDeactive,
    });
  } catch (error) {
    response.status(500).json({ ack: 0, msg: error.message || `Server Error` });
  }
};

// user list
exports.getUserList = async (request, response) => {
  try {
    const { elements, page, searchParam = "" } = request.query;
    const limit = parseInt(elements);
    const offset = parseInt(limit * (page - 1));
    const { rows, count } = await User.findAndCountAll({
      where: { fullName: { [Op.like]: `%${searchParam}%` }, isActive: 1 },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    response.status(200).json({
      ack: 1,
      data: rows,
      totalElements: count,
      totalPage: Math.ceil(count / limit),
      page: parseInt(page),
      elementsPerPage: limit,
    });
  } catch (error) {
    response.status(200).json({ ack: 0, msg: error.message || "Server Error" });
  }
};

//edit user
exports.editUser = async (request, response) => {
  const userId = request.params.userId;
  try {
    const { error } = userUpdateSchema.validate(request.body);
    if (error) {
      return response
        .status(200)
        .json({ ack: 0, msg: error.details[0].message });
    }
    if (!userId) {
      response.status(200).json({ ack: 0, msg: "No user Id" });
    } else {
      const userData = await User.findByPk(userId);
      if (userData) {
        await User.update({ ...request.body }, { where: { id: userData.id } });
        response.status(200).json({ ack: 1, msg: "User Updated Successfully" });
      } else {
        response.status(200).json({ ack: 0, msg: "No User Data" });
      }
    }
  } catch (error) {
    response.status(200).json({ ack: 0, msg: error.message || "Server Error" });
  }
};
