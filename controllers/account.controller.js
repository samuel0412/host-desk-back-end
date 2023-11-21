const {
  createAccountSchema,
  updateAccountSchema,
} = require("./validation/account.validation");
const {
  Accounts,
  User,
  BusinessDetails,
  OpeningTimes,
  Roles,
} = require("../models");
const { sequelize } = require("../models/index");
const bcrypt = require("bcryptjs");

exports.createAccount = async (request, response) => {
  const t = await sequelize.transaction();
  try {
    const body = request.body;
    const { error } = createAccountSchema.validate(body);
    if (error) {
      response.status(200).json({ ack: 0, msg: error.details[0].message });
    } else {
      const accountData = await Accounts.findOne({
        where: { email: body.personalDetails.email },
      });
      const checkForIfUserExists = await User.findOne({
        where: { email: body.personalDetails.email },
      });
      if (accountData || checkForIfUserExists) {
        response
          .status(200)
          .json({ ack: 0, msg: "Account already exists with this Email" });
      } else {
        const roleData = await Roles.findOne({
          where: {
            name: "Editor",
          },
        });
        const hash = bcrypt.hashSync(body.personalDetails.password, 10);
        const createAccount = await Accounts.create(
          {
            fullName: body.personalDetails.fullName,
            email: body.personalDetails.email,
            isTermsAndConditionAccept:
              body.personalDetails.isTermsAndConditionAccept,
            isAgreeToUsePersonalData:
              body.personalDetails.isAgreeToUsePersonalData,
          },
          { transaction: t }
        );

        const createUser = await User.create(
          {
            fullName: body.personalDetails.fullName,
            email: body.personalDetails.email,
            password: hash,
            isActive: true,
            isAdmin: true,
            roleId: roleData.dataValues.id,
            profilePic: body.personalDetails.profilePic,
            accountId: createAccount.dataValues.id,
          },
          { transaction: t }
        );
        const createBusinessDetails = await BusinessDetails.create({
          ...body.businesDetails,
          businessPhoneNumber: body.personalDetails.contactNumber,
          accountId: createAccount.dataValues.id,
        });
        for (let i = 0; i < body.openingTime.length; i++) {
          await OpeningTimes.create(
            {
              ...body.openingTime[i],
              accountId: createAccount.dataValues.id,
            },
            { transaction: t }
          );
        }

        await t.commit();
        response.status(200).json({
          ack: 1,
          msg: "Successfully Created",
          data: createAccount,
        });
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    await t.rollback();
    response.status(500).json({ ack: 0, msg: error.message || "Server error" });
  }
};
