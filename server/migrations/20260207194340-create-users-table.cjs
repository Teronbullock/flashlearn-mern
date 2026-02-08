'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('fc_users', {
        id: { 
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
          user_email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
          user_pass: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        // Manual Timestamps (Required in Migrations)
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
      }, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('fc_users');
  }
};
