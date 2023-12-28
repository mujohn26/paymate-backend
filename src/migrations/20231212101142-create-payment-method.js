'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_methods', {
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references: "payment_types",
        key: "id"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: "users",
        key: "id"
      },
   
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_methods');
  }
};