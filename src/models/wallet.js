'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Transaction.belongsTo(wallet, { foreignKey: 'walletId', });

    }
  }
  wallet.init({
    userId: DataTypes.INTEGER,
    walletName: DataTypes.STRING,
    accountId: DataTypes.STRING,
    walletLogo: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wallet',
  });
  return wallet;
};