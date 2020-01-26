'use strict';
module.exports = (sequelize, DataTypes) => {
  const ABCTransaction = sequelize.define('ABCTransaction', {
    created_date: DataTypes.DATE,
    value: DataTypes.FLOAT,
    points: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  ABCTransaction.associate = function(models) {
    // associations can be defined here
    ABCTransaction.belongsTo(models.ABCUser,{
      foreignKey: 'user_id',
      as: 'abcuser',
    });
  };
  return ABCTransaction;
};