"use strict";
module.exports = (sequelize, DataTypes) => {
  const ResetToken = sequelize.define(
    "ResetToken",
    {
      userId: DataTypes.UUID,
      token: DataTypes.INTEGER,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
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
  ResetToken.associate = function (models) {
    ResetToken.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return ResetToken;
};
