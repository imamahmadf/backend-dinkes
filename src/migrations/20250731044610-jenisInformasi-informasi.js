"use strict";

const constraintName = "fk-informasi-jenisInformasi";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("informasis", {
      fields: ["jenisInformasiId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "jenisInformasis",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("informasis", constraintName);
  },
};
