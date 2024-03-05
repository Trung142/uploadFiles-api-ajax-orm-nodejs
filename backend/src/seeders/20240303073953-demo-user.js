'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * Example:
    */
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'ayun',
        lastName: 'trung',
        email: 'trung142@gmail.com',
        password: '12345',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Hoag',
        lastName: 'Ngoc',
        email: 'trung142@gmail.com',
        password: '12345',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Hoang',
        lastName: 'Duy',
        email: 'trung142@gmail.com',
        password: '12345',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
