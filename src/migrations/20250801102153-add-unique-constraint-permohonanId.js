"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambahkan unique constraint pada permohonanId
    await queryInterface.addConstraint("keberatans", {
      fields: ["permohonanId"],
      type: "unique",
      name: "unique_permohonanId",
    });
  },

  async down(queryInterface, Sequelize) {
    // Hapus unique constraint
    await queryInterface.removeConstraint("keberatans", "unique_permohonanId");
  },
};
