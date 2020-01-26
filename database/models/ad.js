'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    bikewayContent: DataTypes.STRING,
    name: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  Ad.associate = function(models) {
    // associations can be defined here
    Ad.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Ad;
};