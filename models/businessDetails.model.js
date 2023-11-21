"use strict";
module.exports = (sequelize, DataTypes) => {
  const BusinessDetails = sequelize.define(
    "BusinessDetails",
    {
      businessPhoneNumber: DataTypes.BIGINT,
      businessLogo: DataTypes.STRING,
      businessName: DataTypes.STRING,
      locationName: DataTypes.STRING,
      latitude: DataTypes.DECIMAL(11, 7),
      longititude: DataTypes.DECIMAL(11, 7),
      industry: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
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

  return BusinessDetails;
};
