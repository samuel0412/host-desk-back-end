const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string().required().max(50).label("Full Name"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
  roleId: Joi.number().required().label("Role Id"),
});

const loginSchema = Joi.object({
  email: Joi.string().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

const resetSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .label("Email"),
});
const resetTokenSubmit = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .label("Email"),
  token: Joi.number().required().label("Token"),
});
const resetCodeSubmitSchema = Joi.object({
  code: Joi.number().label("Code").required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().required().label("Password"),
  code: Joi.number().label("Code").required(),
});

const userUpdateSchema = Joi.object({
  fullName: Joi.string().optional().label("Name"),
  email: Joi.string().label("Email"),
  city: Joi.string().optional().label("City"),
  company: Joi.string().optional().label("Company"),
  state: Joi.string().optional().label("State"),
  country: Joi.string().optional().label("Country"),
  address: Joi.string().optional().label("Address"),
  postalCode: Joi.string().optional().label("Postal Code"),
  profilePic: Joi.string().optional().label("Profile Picture"),
  roleId: Joi.number().optional().label("Role Id"),
});

module.exports = {
  signupSchema,
  loginSchema,
  resetSchema,
  resetTokenSubmit,
  resetCodeSubmitSchema,
  resetPasswordSchema,
  userUpdateSchema,
};
