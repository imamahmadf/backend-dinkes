"use strict";

const currentDate = new Date();
const temaBerita = [
  {
    id: 1,
    tema: "kesehatan Anak",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    tema: "Kesehatan Keluarga",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("temaBerita", temaBerita, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("temaBerita", null, {});
  },
};
