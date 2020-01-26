'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bikeway = sequelize.define('Bikeway', {
    name: DataTypes.STRING,
    estimatedTime: DataTypes.BIGINT,
    isActive: DataTypes.BOOLEAN
  }, {});
  Bikeway.associate = function(models) {
    // associations can be defined here
    Bikeway.hasMany(models.Travel,{
      foreignKey: 'bikewayId'
    });
  };
  return Bikeway;
};