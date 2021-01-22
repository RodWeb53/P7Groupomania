'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Moderateur',
      email: 'moderateur@groupomania.fr',
      password: '$2a$10$CUs3LidXNYLUkPNMil0Ev.AHoS8IHQy.OeK37.m9VO3BVOJXQ201i',
      avatar: 'http://localhost:3000/images/img-profil-base.png',
      isModerateur: true,
      bio: 'Pensez à compléter la bio de votre profil...',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};