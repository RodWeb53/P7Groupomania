'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'UserBase',
      email: 'userbase@groupomania.fr',
      password: '$2b$10$9nK9T01Gfz4DRwVCjC6dK.whYLAaL7EDZEH85V.uqOii83fRklPsW',
      avatar: 'http://localhost:3000/images/img-profil-base.png',
      isModerateur: false,
      bio: 'Pensez à compléter la bio de votre profil...',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};