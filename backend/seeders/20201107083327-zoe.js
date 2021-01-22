'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Zoé',
      email: 'zoe@groupomania.com',
      password: '$2a$10$nehbvEssUqpOrY4qNFbVrePPt/LZ.bmyhw6HJIFQtpFydtFu1g.G.',
      avatar: 'http://localhost:3000/images/femme1.jpg1610884104336.jpg',
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