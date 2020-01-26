'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    lat: DataTypes.DOUBLE,
    lon: DataTypes.DOUBLE,
    address: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsTo(models.GeoMap, {
      foreignKey: 'geomapId',
      as: 'geomap',
    });
    Location.belongsTo(models.Shop, {
      foreignKey: 'shopId',
      as: 'shop',
    });
    Location.belongsToMany(models.Travel, {
      foreignKey: 'travelId',
      through: 'LocationTravels',
      as: 'travels',
    });
  };
  return Location;
};