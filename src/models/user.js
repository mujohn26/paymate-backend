'use strict';
const {
  Model, BOOLEAN, INTEGER 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    names: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified:DataTypes.BOOLEAN,
    isActive:DataTypes.BOOLEAN,
    verificationCode:DataTypes.INTEGER,
    isVerificationCodeExpired:DataTypes.BOOLEAN,
    pin: DataTypes.STRING,
    loginCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};