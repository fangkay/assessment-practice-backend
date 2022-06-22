"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Johns Space",
          description: "A space only for real Johns",
          backgroundColor: "#F5F5F5",
          color: "#191919",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Mike's Space",
          description: "A space for Mike and Mike only",
          backgroundColor: "#dbe9ff",
          color: "#191919",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
