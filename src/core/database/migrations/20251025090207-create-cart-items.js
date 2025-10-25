'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      item_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      cart_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'cart_id',
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add unique constraint for cart_id and book_id combination so there won't be duplicate book in the same cart
    await queryInterface.addConstraint('cart_items', {
      fields: ['cart_id', 'book_id'],
      type: 'unique',
      name: 'unique_cart_book',
    });

    // Add indexes for foreign keys
    await queryInterface.addIndex('cart_items', ['cart_id']);
    await queryInterface.addIndex('cart_items', ['book_id']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cart_items');
  },
};
