module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Transactions',
        'transactionId',
         Sequelize.STRING
       ),
    ]);
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  }
};
