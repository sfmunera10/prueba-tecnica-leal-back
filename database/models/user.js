'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    citizenId: DataTypes.INTEGER,
    citizenIdType: DataTypes.STRING,
    age: DataTypes.INTEGER,
    cellphoneNumber: DataTypes.INTEGER,
    role: DataTypes.STRING,
    company: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Travel, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Payment, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Inventory, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Ad, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};