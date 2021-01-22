'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Gabin',
      email: 'gabin@groupomania.com',
      password: '$2a$10$9rf8d1USTOwRzL10xTmshOBb59apgu49EfDB7JTXLTmI77OsNfgam',
      avatar: 'http://localhost:3000/images/personnage.jpg1610996561795.jpg',
      isModerateur: false,
      bio: 'Veuillez compléter votre Bio...',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};