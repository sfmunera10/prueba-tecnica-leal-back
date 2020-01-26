'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ABCTransactions', {
      transaction_id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'abcusers',
          key: 'user_id'
        },
        allowNull: false
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      value: {
        type: Sequelize.FLOAT
      },
      points: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ABCTransactions');
  }
};