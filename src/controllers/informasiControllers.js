const { informasi, jenisInformasi, bidang } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../lib/auth");

module.exports = {
  getInformasi: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await informasi.findAll({
        include: [{ model: jenisInformasi }, { model: bidang }],
      });

      return res.status(200).json({
        result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getSeed: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await jenisInformasi.findAll({});

      return res.status(200).json({
        result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  postInformasi: async (req, res) => {
    console.log("=== REQUEST BODY ===");
    console.log(req.body);
    console.log("=== REQUEST FILES ===");
    console.log(req.file);
    console.log("=== END LOG ===");

    const { judul, konten, ringkasan, tahun, jenis } = req.body;

    try {
      const filePath = "informasi";
      let dokumenPath = null;
      if (req.file) {
        const { filename } = req.file;
        dokumenPath = `/${filePath}/${filename}`;
      }

      const result = await informasi.create({
        dokumen: dokumenPath,
        judul,
        konten,
        ringkasan,
        tahun,
        jenisInformasiId: parseInt(jenis),
      });

      return res.status(200).json({
        message: "Informasi berhasil ditambahkan",
        result,
      });
    } catch (err) {
      console.log("Error creating informasi:", err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
