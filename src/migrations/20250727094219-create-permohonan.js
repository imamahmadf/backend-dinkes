"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permohonans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      nik: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      ktp: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      nomorWA: {
        type: Sequelize.STRING,
      },
      asal: {
        type: Sequelize.STRING,
      },
      alasan: {
        type: Sequelize.STRING,
      },
      rincian: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("permohonans");
  },
};
