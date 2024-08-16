module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'loginCount',
         Sequelize.INTEGER
       ),
    ]);
  },
  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
  }
};
