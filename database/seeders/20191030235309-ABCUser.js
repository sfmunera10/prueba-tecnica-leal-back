'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'ABCUsers',
    [
      {
        user_id: "asdasdasdqweqwe123123",
        created_date: new Date(),
        name: 'name1',
        lastName: 'lastName1',
        birth_date: new Date(),
        email: "sf",
        password: "asdasd"
      },
      {
        user_id: "qwewqweqwe123123123",
        created_date: new Date(),
        name: 'name2',
        lastName: 'lastName2',
        birth_date: new Date(),
        email: "asdasd",
        password: "asdasd"
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ABCUsers', null, {}),
};
