'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'romain',
      email: 'romain@groupomania.com',
      password: '$2a$10$ZBqTtLivF7WCJACQU3eEruWVSuyQRY.54gDB1Nk3TnJUfd8rctklu',
      avatar: 'http://localhost:3000/images/home1.jpg1610883778459.jpg',
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