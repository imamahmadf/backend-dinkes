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
    const slugify = (judul) =>
      judul
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
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
        ringkasan: konten.replace(/<[^>]*>/g, "").substring(0, 200), // menghapus tag HTML untuk ringkasan
        penulis: "Admin", // default penulis
        temaBeritaId: parseInt(tema), // default tema berita
        slug: slugify(judul),
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
        attributes: ["id", "judul", "ringkasan", "foto", "penulis", "slug"],
        limit: 3,
      });

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getAllBerita: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const offset = limit * page;
    try {
      const result = await berita.findAll({
        offset,
        limit,
        include: [
          { model: temaBerita, as: "temaBerita", attributes: ["id", "tema"] },
          { model: bidang, as: "bidang", attributes: ["id", "nama"] },
        ],
        attributes: ["id", "judul", "ringkasan", "foto", "penulis", "slug"],
      });

      const totalRows = await berita.count({
        offset,
        limit,
      });
      const totalPage = Math.ceil(totalRows / limit);

      return res
        .status(200)
        .json({ result, page, limit, totalRows, totalPage });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  getDetailberita: async (req, res) => {
    const slug = req.params.slug;
    try {
      const result = await berita.findOne({
        include: [
          { model: temaBerita, as: "temaBerita", attributes: ["id", "tema"] },
          { model: bidang, as: "bidang", attributes: ["id", "nama"] },
        ],
        attributes: [
          "id",
          "judul",
          "ringkasan",
          "foto",
          "penulis",
          "slug",
          "isi",
        ],
        where: { slug },
      });

      return res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
