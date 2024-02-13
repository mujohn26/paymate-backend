'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userInformation.init({
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    nationalId: DataTypes.STRING,
    email: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'userInformation',
  });
  return userInformation;
};