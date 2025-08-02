"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class berita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.temaBerita, {
        foreignKey: "temaBeritaId",
        as: "temaBerita",
      });
      this.belongsTo(models.bidang, {
        foreignKey: "bidangId",
        as: "bidang",
      });
    }
  }
  berita.init(
    {
      judul: DataTypes.STRING,
      ringkasan: DataTypes.STRING,
      penulis: DataTypes.STRING,
      isi: DataTypes.TEXT,
      foto: DataTypes.STRING,
      temaBeritaId: DataTypes.INTEGER,
      bidangId: DataTypes.INTEGER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "berita",
    }
  );
  return berita;
};
