const { informasi } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { blacklistedTokens } = require("../lib/auth");

module.exports = {
  getPublik: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await informasi.findAll({});

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
};
