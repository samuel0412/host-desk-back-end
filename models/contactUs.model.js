"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define(
    "ContactUs",
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      subject: DataTypes.STRING,
      message: DataTypes.STRING,
      phoneNumber: DataTypes.BIGINT,
      file: DataTypes.STRING,
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

  return ContactUs;
};
