'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      models.Message.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      models.Message.hasMany(models.Like, { foreignKey: 'likeId', allowNull: false });
      models.Message.hasMany(models.Dislike, { foreignKey: 'dislikeId', allowNull: false });
      models.Message.hasMany(models.Comment, { foreignKey: 'commentId', allowNull: false });
    }
  };
  Message.init({
    msgId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};