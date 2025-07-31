"use strict";

const currentDate = new Date();
const bidangs = [
  {
    id: 1,
    nama: "YANKES",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    nama: "P2P",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 3,
    nama: "KESMAS",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    nama: "SDK",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 5,
    nama: "SEKRETARIAT",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bidangs", bidangs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bidangs", null, {});
  },
};
