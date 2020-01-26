'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    modelName: DataTypes.STRING,
    description: DataTypes.STRING,
    QR: DataTypes.STRING
  }, {});
  Inventory.associate = function(models) {
    // associations can be defined here
    Inventory.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Inventory;
};