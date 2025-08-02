const { permohonan, keberatan, status } = require("../models");

const PizZip = require("pizzip");
const fs = require("fs");
const path = require("path");

// Fungsi untuk menghasilkan string acak 10 karakter
const generateRandomString = (length = 10) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = {
  postPermohonan: async (req, res) => {
    const { nik, nama, alamat, email, nomorWA, alasan, asal, rincian } =
      req.body;
    console.log(req.body, "BODYYYY");
    try {
      const filePath = "permohonan";
      let ktp = null;
      if (req.file) {
        // console.log("GGGGGGGGGGGGGGGGGGGGGGGGGG");
        const { filename } = req.file;
        ktp = `/${filePath}/${filename}`;
      }

      // Generate nomor permohonan acak
      const noPermohonan = generateRandomString(10);

      const result = await permohonan.create({
        nik,
        nama,
        ktp,
        alamat,
        email,
        nomorWA,
        asal,
        alasan,
        rincian,

        noPermohonan,
      });

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  cekPermohonan: async (req, res) => {
    const noPermohonan = req.query.noPermohonan;
    try {
      const result = await permohonan.findOne({
        where: { noPermohonan },
        include: [{ model: status }, { model: keberatan }],
      });

      if (!result) {
        return res.status(500).json({ massage: "data tidak ditemukan" });
      }

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getPermohonan: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 50;

    const offset = limit * page;
    try {
      const result = await permohonan.findAll({
        offset,
        limit,
        include: [{ model: status }],
      });
      const totalRows = await permohonan.count({
        offset,
        limit,
      });
      const totalPage = Math.ceil(totalRows / limit);
      return res
        .status(200)
        .json({ result, page, limit, totalRows, totalPage });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  postKeberatan: async (req, res) => {
    const { noPermohonan, alasan } = req.body;
    console.log(req.body);
    try {
      const cekPermohonan = await permohonan.findOne({
        where: { noPermohonan },
      });

      if (!cekPermohonan) {
        return res.status(404).json({
          message: "Permohonan tidak ditemukan",
          code: 404,
        });
      }

      // Cek apakah sudah ada keberatan untuk permohonan ini
      const existingKeberatan = await keberatan.findOne({
        where: { permohonanId: cekPermohonan.id },
      });

      if (existingKeberatan) {
        return res.status(400).json({
          message: "Keberatan untuk permohonan ini sudah ada",
          code: 400,
        });
      }

      const result = await keberatan.create({
        alasan,
        permohonanId: cekPermohonan.id,
      });

      return res.status(200).json({
        message: "Keberatan berhasil dibuat",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
