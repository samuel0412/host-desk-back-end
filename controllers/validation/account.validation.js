const Joi = require("joi");

const createAccountSchema = Joi.object({
  personalDetails: Joi.object({
    fullName: Joi.string().required().label("Full Name"),
    contactNumber: Joi.string().optional().allow("").label("Contact Number"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    profilePic: Joi.string().required().label("Profile Pic"),
    isTermsAndConditionAccept: Joi.boolean()
      .required()
      .label("Terms And Condition Accept"),
    isAgreeToUsePersonalData: Joi.boolean()
      .required()
      .label("Agree To UsePersonal Data"),
  }),
  businesDetails: Joi.object({
    businessName: Joi.string().required().label("Business Name"),
    businessLogo: Joi.string().optional().allow("").label("Business Logo"),
    locationName: Joi.string().required().label("Location Name"),
    latitude: Joi.string().required().label("Latitude"),
    longititude: Joi.string().required().label("Longititude"),
    industry: Joi.string().required().label("i=Industry"),
  }),
  openingTime: Joi.array().items({
    dayId: Joi.number().required().label("Day Id"),
    startTime: Joi.string().required().label("Start Time"),
    endTime: Joi.string().required().label("End Time"),
    isOpen: Joi.boolean().required().label("Is Open"),
  }),
});

const updateAccountSchema = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
});
module.exports = {
  createAccountSchema,
  updateAccountSchema,
};
