'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationTravels = sequelize.define('LocationTravels', {
  }, {});
  LocationTravels.associate = function(models) {
    /*LocationTravels.belongsTo(models.Travel, {
      foreignKey: 'travelId',
      as: 'travels',
    });
    LocationTravels.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'locations',
    });*/
  };
  return LocationTravels;
};