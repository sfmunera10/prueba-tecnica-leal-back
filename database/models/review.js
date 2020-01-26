'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: DataTypes.TEXT,
    score: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Shop,{
      foreignKey: 'shopId',
      as: 'shop',
    });
    Review.belongsTo(models.User,{
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Review;
};