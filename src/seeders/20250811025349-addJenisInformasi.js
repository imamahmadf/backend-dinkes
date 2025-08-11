"use strict";
const currentDate = new Date();
module.exports = {
  async up(queryInterface, Sequelize) {
    const jenisInformasis = [
      {
        id: 5,
        jenis: "keuangan",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 6,
        jenis: "barang dan Jasa",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ];

    await queryInterface.bulkInsert("jenisInformasis", jenisInformasis, {
      updateOnDuplicate: ["id"],
    });
  },

  async down(queryInterface, Sequelize) {
    // Optional: kembalikan ke nama lama jika perlu rollback
  },
};
