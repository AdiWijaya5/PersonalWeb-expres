'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Blogs', [
      {
        title: 'Calculator Os',
        content: 'Calculator berbasis web dengan tampilan os dengan tampilan mirip dengan app calculator iphone os',
        image: 'calculator.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Portofolio React',
        content: 'Sebuah portofolio menggunakan bahasa pemorgraman react + vite, serta framer-motion sebagai element tambahan untuk memperindah tampilan untuk dilihat user',
        image: 'portofolio.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Blogs', null, {});
  },
};
