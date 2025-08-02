"use strict";

const currentDate = new Date();
const statuses = [
  {
    id: 1,
    nama: "Proses",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    nama: "Selesai",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 3,
    nama: "Ditolak",

    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    nama: "Keberatan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("statuses", statuses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
