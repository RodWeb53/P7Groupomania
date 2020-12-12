'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isModerateur: DataTypes.BOOLEAN,
    bio: DataTypes.TEXT,
    avatar: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};