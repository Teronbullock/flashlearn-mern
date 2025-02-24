'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('fc_cards', {
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
          model: 'fc_users',
          key: 'id',
        }
      },
      set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'fc_sets',
          key: 'id',
        }
      },
      term: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      definition: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      bg_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('fc_card');
  }
};
