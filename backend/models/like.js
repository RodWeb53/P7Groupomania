'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      models.Like.belongsTo(models.Message, { foreignKey: 'msgId', onDelete: 'CASCADE' });
    }
  };
  Like.init({
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    msgId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};