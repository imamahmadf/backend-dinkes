"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class titikPeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  titikPeta.init(
    {
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      nama: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "titikPeta",
    }
  );
  return titikPeta;
};
