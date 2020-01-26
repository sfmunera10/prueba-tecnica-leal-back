'use strict';
module.exports = (sequelize, DataTypes) => {
  const Travel = sequelize.define('Travel', {
    startDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
    duration: DataTypes.BIGINT
  }, {});
  Travel.associate = function(models) {
    // associations can be defined here
    Travel.belongsTo(models.Bikeway, {
      foreignKey: 'bikewayId',
      as: 'bikeway',
    });
    Travel.belongsTo(models.GeoMap, {
      foreignKey: 'geomapId',
      as: 'geomap',
    });
    Travel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Travel.belongsToMany(models.Location, {
      foreignKey: 'locationId',
      through: 'LocationTravels',
      as: 'locations',
    });
  };
  return Travel;
};