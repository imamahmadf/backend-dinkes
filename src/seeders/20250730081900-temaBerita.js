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
  {
    id: 3,
    tema: "Promosi Kesehatan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    tema: "Kesehatan Usia Produktif",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 5,
    tema: "Kesehatan Lanjut usia",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 6,
    tema: "Kesehatan Jiwa",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 7,
    tema: "Kesehatan Kerja dan Olahraga",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 8,
    tema: "Kesehatan Tradisional",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 9,
    tema: "Gizi Masyarakat",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 10,
    tema: "Kesehatan Ibu",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 11,
    tema: "Kesehatan Bayi/Balita",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 12,
    tema: "Kesehatan Anak Usia Sekolah dan remaja",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 13,
    tema: "Imunisasi",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 14,
    tema: "Penyakit Tidak Menular",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 15,
    tema: "Kesehatan Lingkungan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 16,
    tema: "Alat Kesehatan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 17,
    tema: "Penyakit Tidak Menular",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 18,
    tema: "Kefarmasian",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 19,
    tema: "Sumber Daya Manusia Kesehatan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 20,
    tema: "Rujukan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 21,
    tema: "Sarana dan Prasarana",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 22,
    tema: "Pelayanan Kesehatan Dasar",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 23,
    tema: "BPJS",
    createdAt: currentDate,
    updatedAt: currentDate,
  },

  {
    id: 24,
    tema: "PSC",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 25,
    tema: "Kepegawaian",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 26,
    tema: "Keuangan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 27,
    tema: "Aset",
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
