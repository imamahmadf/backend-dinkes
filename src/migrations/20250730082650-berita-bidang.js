"use strict";

const constraintName = "fk-bidang-berita";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("berita", {
      fields: ["bidangId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "bidangs",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("berita", constraintName);
  },
};
