"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert(
      "Days",
      [
        {
          name: "Monday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tuesday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Wednesday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thursday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Friday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Saturday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sunday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
