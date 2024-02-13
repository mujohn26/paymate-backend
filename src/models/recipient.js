'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // recipient.belongsTo(
      //   models.Transaction,
      //   { foreignKey: 'id' },
      //   { onDelete: 'cascade' },
      //   { onUpdate: 'cascade' }
      // );
  
    }
  }
  recipient.init({
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipient',
  });
  return recipient;
};