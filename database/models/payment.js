'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    travelTime: DataTypes.BIGINT,
    amount: DataTypes.DOUBLE
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Payment;
};