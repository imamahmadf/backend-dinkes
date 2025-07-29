'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class informasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  informasi.init({
    judul: DataTypes.STRING,
    ringkasan: DataTypes.STRING,
    unit: DataTypes.STRING,
    dokumen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'informasi',
  });
  return informasi;
};