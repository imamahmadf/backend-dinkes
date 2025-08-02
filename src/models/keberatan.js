"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class keberatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.permohonan);
    }
  }
  keberatan.init(
    {
      permohonanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "PermohonanId tidak boleh kosong",
          },
        },
      },
      alasan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "keberatan",
    }
  );
  return keberatan;
};
