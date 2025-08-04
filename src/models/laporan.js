'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  laporan.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    subjek: DataTypes.STRING,
    pesan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'laporan',
  });
  return laporan;
};