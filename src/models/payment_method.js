'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payment_method.init({
    accountId:{ 
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    payment_id:DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'payment_method',
    underscored:true
  });
  return payment_method;
};