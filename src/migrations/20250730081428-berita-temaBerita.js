"use strict";

const constraintName = "fk-tembaBerita-berita";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("berita", {
      fields: ["temaBeritaId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "temaBerita",
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
