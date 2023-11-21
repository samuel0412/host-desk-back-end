"use strict";
module.exports = (sequelize, DataTypes) => {
  const Days = sequelize.define(
    "Days",
    {
      name: DataTypes.STRING,
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

  return Days;
};
