"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class temaBerita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.berita);
    }
  }
  temaBerita.init(
    {
      tema: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "temaBerita",
    }
  );
  return temaBerita;
};
