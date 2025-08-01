"use strict";

const currentDate = new Date();
const roles = [
  { id: 1, nama: "User", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 2,
    nama: "Admin Dinas Kesehatan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 3,
    nama: "Super Admin",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
