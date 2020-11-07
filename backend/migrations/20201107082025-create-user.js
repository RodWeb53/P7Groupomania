'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      userId: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        isEmail: true,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isModerateur: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: 'Pensez à compléter la bio de votre profil...'
      },
      avatar: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: 'http://localhost:3000/images/img-profil-base.png'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};