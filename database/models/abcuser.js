'use strict';
module.exports = (sequelize, DataTypes) => {
  const ABCUser = sequelize.define('ABCUser', {
    user_id: DataTypes.STRING,
    created_date: DataTypes.DATE,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  ABCUser.associate = function(models) {
    // associations can be defined here
    ABCUser.hasMany(models.ABCTransaction, {
      foreignKey: 'user_id'
    });
  };
  return ABCUser;
};