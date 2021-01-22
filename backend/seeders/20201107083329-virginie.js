'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Virginie',
      email: 'virginie@groupomania.com',
      password: '$2a$10$uIrvQxeg/ykeXPbSUmaiOOMl26rPlOf5irlRz7dNc6N4QizIBJ.y2',
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