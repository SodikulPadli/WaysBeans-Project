'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        },
      });
      transaction.belongsToMany(models.product, {
        as: 'product',
        through: {
          model: 'detailtransaction',
          as: 'bridge',
        },
        foreignKey: 'idTransaction',
      });
    }
  }
  transaction.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      attechment: DataTypes.STRING,
      status: DataTypes.STRING,
      orderQuantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'transaction',
    }
  );
  return transaction;
};
