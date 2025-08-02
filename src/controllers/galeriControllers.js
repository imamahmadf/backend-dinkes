const { galeri } = require("../models");

module.exports = {
  getFoto: async (req, res) => {
    const tipe = req.params.tipe;
    try {
      const result = await galeri.findAll({ where: { tipe } });

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
