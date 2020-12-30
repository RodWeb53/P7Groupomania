'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    static associate(models) {
      models.Dislike.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      models.Dislike.belongsTo(models.Message, { foreignKey: 'msgId', onDelete: 'CASCADE' });
    }
  };
  Dislike.init({
    dislikeId: {
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
    modelName: 'Dislike',
  });
  return Dislike;
};