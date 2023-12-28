'use strict';
import { Model, BOOLEAN, INTEGER } from 'sequelize';
export default (sequelize, DataTypes) => {
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
    isVerificationCodeExpired:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};