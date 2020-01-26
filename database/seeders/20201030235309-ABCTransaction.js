'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'ABCTransactions',
    [
      {
        user_id: "asdasdasdqweqwe123123",
        created_date: new Date(),
        value: 12.0,
        points: 12,
        status:0
      },
      {
        user_id: "asdasdasdqweqwe123123",
        created_date: new Date(),
        value: 12.0,
        points: 12,
        status:0
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ABCTransactions', null, {}),
};
