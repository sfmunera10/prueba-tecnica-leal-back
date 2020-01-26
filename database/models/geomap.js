'use strict';
module.exports = (sequelize, DataTypes) => {
  const GeoMap = sequelize.define('GeoMap', {
    cityName: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  GeoMap.associate = function(models) {
    // associations can be defined here
    GeoMap.belongsTo(models.Travel, {
      foreignKey: 'travelId',
      as: 'travel',
    });
    GeoMap.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location',
    });
    GeoMap.hasMany(models.Shop,{
      foreignKey: 'geomapId'
    });
  };
  return GeoMap;
};