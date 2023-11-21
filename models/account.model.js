"use strict";
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define(
    "Accounts",
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      isTermsAndConditionAccept: DataTypes.BOOLEAN,
      isAgreeToUsePersonalData: DataTypes.BOOLEAN,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["id"],
        },
      ],
    }
  );

  return Accounts;
};
