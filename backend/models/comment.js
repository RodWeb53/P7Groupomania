'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      models.Comment.belongsTo(models.Message, { foreignKey: 'msgId', onDelete: 'CASCADE' });
    }
  };
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    msgId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};