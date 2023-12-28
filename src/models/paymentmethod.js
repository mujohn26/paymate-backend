'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'userId'})
      this.belongsTo(models.PaymentType,{foreignKey:'paymentId'})
    }
  }
  PaymentMethod.init({
    accountId: DataTypes.INTEGER,
    paymentId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};