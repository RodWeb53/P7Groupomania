'use strict';
module.exports = (sequelize, DataTypes) => {
 
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