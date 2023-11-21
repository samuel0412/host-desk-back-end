"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    profilePic: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  });
  return User;
};
