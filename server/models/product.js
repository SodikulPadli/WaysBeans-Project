'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user, {
        as: 'users',
        foreignKey: {
          name: 'idUser',
        },
      });
      product.hasMany(models.cart, {
        as: 'carts',
        foreignKey: {
          name: 'idProduct',
        },
      });
      product.belongsToMany(models.transaction, {
        as: 'transactions',
        through: {
          model: 'detailtransaction',
          as: 'bridge',
        },
        foreignKey: 'idProduct',
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'product',
    }
  );
  return product;
};
