'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userSettings.init({
    userId: DataTypes.INTEGER,
    isNotificationEnabled: DataTypes.BOOLEAN,
    isNotificationSoundEnabled: DataTypes.STRING,
    country: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    nationalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userSettings',
  });
  return userSettings;
};