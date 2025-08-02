const { informasi, jenisInformasi, bidang } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../lib/auth");

module.exports = {
  getInformasi: async (req, res) => {
    const jenisInformasiId = req.params.id;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 50;

    const offset = limit * page;

    const whereCondition = {};
    console.log(jenisInformasiId, "CEK JENIS INFORMASI");
    if (jenisInformasiId && jenisInformasiId !== "0") {
      whereCondition.jenisInformasiId = jenisInformasiId;
    }
    try {
      const result = await informasi.findAll({
        include: [{ model: jenisInformasi }, { model: bidang }],
        where: whereCondition,
        offset,
        limit,
      });
      const totalRows = await informasi.count({
        where: whereCondition,
        offset,
        limit,
      });
      const totalPage = Math.ceil(totalRows / limit);
      return res
        .status(200)
        .json({ result, page, limit, totalRows, totalPage });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getSeed: async (req, res) => {
    console.log("CEKKKKKKKKKK");
    try {
      const result = await jenisInformasi.findAll({});
      const resultBidang = await bidang.findAll({});

      return res.status(200).json({
        result,
        resultBidang,
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

    const { judul, konten, ringkasan, tahun, jenis, bidang } = req.body;

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
        bidangId: parseInt(bidang),
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
