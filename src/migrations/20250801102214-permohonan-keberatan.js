"use strict";

const constraintName = "fk-permohonan-keberatan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("keberatans", {
      fields: ["permohonanId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "permohonans",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("keberatans", constraintName);
  },
};
