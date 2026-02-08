'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Wrap in a transaction for safety
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('fc_refresh_tokens', {
         id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "fc_users",
            key: 'id',
          }
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('fc_refresh_tokens');
  }
};