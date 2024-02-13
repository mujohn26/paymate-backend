'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasOne(models.recipient, {
        foreignKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      Transaction.hasMany(models.wallet, {
        foreignKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      Transaction.hasMany(models.User, {
        foreignKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      Transaction.hasMany(models.Charge, {
        foreignKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
  }
  Transaction.init({
    walletId: DataTypes.INTEGER,
    senderId: DataTypes.STRING,
    recipientId: DataTypes.STRING,
    amount: DataTypes.STRING,
    chargeId: DataTypes.INTEGER,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};