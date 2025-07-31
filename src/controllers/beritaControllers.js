const { permohonan, berita, temaBerita, bidang } = require("../models");
const PizZip = require("pizzip");
const fs = require("fs");
const path = require("path");

module.exports = {
  postBerita: async (req, res) => {
    console.log("=== REQUEST BODY ===");
    console.log(req.body);
    console.log("=== REQUEST FILES ===");
    console.log(req.file);
    console.log("=== END LOG ===");

    const { judul, konten, bidang, tema } = req.body;

    // Validasi input
    if (!judul || !konten) {
      return res.status(400).json({
        message: "Judul dan konten harus diisi",
        code: 400,
      });
    }

    try {
      const filePath = "berita";
      let fotoPath = null;
      if (req.file) {
        // console.log("GGGGGGGGGGGGGGGGGGGGGGGGGG");
        const { filename } = req.file;
        fotoPath = `/${filePath}/${filename}`;
      }

      const result = await berita.create({
        judul,
        bidangId: parseInt(bidang),
        foto: fotoPath,
        isi: konten, // konten sudah disanitasi oleh middleware
        ringkasan: konten.replace(/<[^>]*>/g, "").substring(0, 100), // menghapus tag HTML untuk ringkasan
        penulis: "Admin", // default penulis
        temaBeritaId: parseInt(tema), // default tema berita
      });

      return res.status(200).json({
        message: "Berita berhasil ditambahkan",
        result,
      });
    } catch (err) {
      console.log("Error creating berita:", err);
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getSeed: async (req, res) => {
    try {
      const resultTema = await temaBerita.findAll();
      const resultBidang = await bidang.findAll();

      return res.status(200).json({ resultTema, resultBidang });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getListBerita: async (req, res) => {
    try {
      const result = await berita.findAll({
        include: [
          { model: temaBerita, as: "temaBerita", attributes: ["id", "tema"] },
          { model: bidang, as: "bidang", attributes: ["id", "nama"] },
        ],
        attributes: ["id", "judul", "ringkasan", "foto", "penulis"],
      });

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
