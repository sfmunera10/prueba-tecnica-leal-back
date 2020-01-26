'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
    Shop.belongsTo(models.GeoMap, {
      foreignKey: 'geomapId',
      as: 'geomap',
    });
    Shop.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location',
    });
    Shop.hasMany(models.Review, {
      foreignKey: 'shopId'
    });
  };
  return Shop;
};