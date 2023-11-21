"use strict";
module.exports = (sequelize, DataTypes) => {
  const OpeningTimes = sequelize.define(
    "OpeningTimes",
    {
      dayId: DataTypes.INTEGER,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      isOpen: DataTypes.BOOLEAN,
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

  return OpeningTimes;
};
