"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class permohonan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  permohonan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nik: DataTypes.STRING,
      nama: DataTypes.STRING,
      ktp: DataTypes.STRING,
      alamat: DataTypes.STRING,
      email: DataTypes.STRING,
      nomorWA: DataTypes.STRING,
      asal: DataTypes.STRING,
      alasan: DataTypes.STRING,
      rincian: DataTypes.STRING,
      noPermohonan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "permohonan",
    }
  );
  return permohonan;
};
