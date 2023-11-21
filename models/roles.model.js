module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define(
    "Roles",
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

  return Roles;
};
