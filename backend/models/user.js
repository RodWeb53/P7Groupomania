'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Message, { foreignKey: 'msgId', allowNull: false });
      models.User.hasMany(models.Like, { foreignKey: 'likeId', allowNull: false });
      models.User.hasMany(models.Dislike, { foreignKey: 'dislikeId', allowNull: false });
      models.User.hasMany(models.Comment, { foreignKey: 'commentId', allowNull: false });
    }
  };
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