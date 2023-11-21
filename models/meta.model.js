"use strict";

module.exports = (sequelize, DataTypes) => {
  const Meta = sequelize.define(
    "Meta",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
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

  return Meta;
};
