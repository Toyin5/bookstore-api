'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'order_id',
        },
        onDelete: 'CASCADE',
      },
      book_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'books',
          key: 'uuid',
        },
        onDelete: 'RESTRICT',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  },
};
