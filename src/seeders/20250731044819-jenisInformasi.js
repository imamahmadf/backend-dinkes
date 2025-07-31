"use strict";

const currentDate = new Date();
const jenisInformasis = [
  {
    id: 1,
    jenis: "Publik",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    jenis: "Berkala",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 3,
    jenis: "Serta Merta",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    jenis: "Setiap Saat",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("jenisInformasis", jenisInformasis, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jenisInformasis", null, {});
  },
};
