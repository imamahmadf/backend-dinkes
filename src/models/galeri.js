"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class galeri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  galeri.init(
    {
      foto: DataTypes.STRING,
      nama: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      tipe: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "galeri",
    }
  );
  return galeri;
};
