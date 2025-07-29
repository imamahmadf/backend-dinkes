const { titikPeta } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../lib/auth");

module.exports = {
  addTitik: async (req, res) => {
    console.log(req.body, "CEK TAMBA USER ROLE");

    const { latitude, longitude, nama, deskripsi } = req.body;
    // Validasi sederhana
    if (!latitude || !longitude || !nama || !deskripsi) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    try {
      const result = await titikPeta.create({
        latitude,
        longitude,
        nama,
        deskripsi,
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
  getTitik: async (req, res) => {
    try {
      const result = await titikPeta.findAll({});

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

  getDetailPusban: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await titikPeta.findOne({
        where: { id: id },
        include: [
          {
            model: indikatorTitik,
            as: "indikatorTitiks",
            attributes: ["nilai", "id"],
            include: [
              {
                model: indikator,
                as: "indikator",
                attributes: ["id", "nama"],
              },
            ],
          },
        ],
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

  getPusban: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 50;
    const time = req.query.time?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const alfabet = req.query.alfabet || "ASC";
    const offset = limit * page;
    try {
      const result = await titikPeta.findAll({
        offset,
        limit,
        order: [
          // ["updatedAt", `${time}`],
          ["nama", `${alfabet}`],
        ],
      });
      const totalRows = await titikPeta.count({
        limit,
        order: [
          // ["updatedAt", `${time}`],
          ["nama", `${alfabet}`],
        ],
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
};
