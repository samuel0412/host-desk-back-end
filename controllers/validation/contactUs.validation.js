const Joi = require("joi");

const createContactUsSchema = Joi.object({
  fullName: Joi.string().required().label("Full Name"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .label("Email"),
  subject: Joi.string().required().label("Subject"),
  message: Joi.string().required().label("Message"),
  phoneNumber: Joi.string().optional().max(12).label("Phone Number"),
  file: Joi.string().optional().max(12).label("File"),
});

module.exports = { createContactUsSchema };
