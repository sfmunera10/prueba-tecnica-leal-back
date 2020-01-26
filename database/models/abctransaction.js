'use strict';
module.exports = (sequelize, DataTypes) => {
  const ABCTransaction = sequelize.define('ABCTransaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    created_date: DataTypes.DATE,
    value: DataTypes.FLOAT,
    points: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  ABCTransaction.associate = function(models) {
    // associations can be defined here
    ABCTransaction.belongsTo(models.ABCUser,{
      foreignKey: 'user_id'
    });
  };
  return ABCTransaction;
};