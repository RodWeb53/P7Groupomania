'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'rodolphe',
      email: 'rodolphe@groupomania.com',
      password: '$2a$10$LGvlyQrbAsEygQ7CnAK7xOv1AzAAWJZMP8pmQDwGO28uMb0RAs0ji',
      avatar: 'http://localhost:3000/images/admin1.jpg1610883623042.jpg',
      isModerateur: false,
      bio: 'La biographie à été mise à jour le 16/01/2021',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};