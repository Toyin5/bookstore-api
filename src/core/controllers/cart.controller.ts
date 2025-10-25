import { Cart, CartItem } from '../model';
import { sequelize } from '../database/sequelize';
import AppError from '../utils/appError';

export const getCart = async (user_id: string) => {
  const cart = await Cart.findOne({ where: { user_id }, include: ['cartItems'] });
  return cart;
};

export const addToCart = async (
  user_id: string,
  bookData: { book_id: string; quantity: number }
) => {
  const transaction = await sequelize.transaction();

  const cart = await Cart.findOne({
    where: { user_id },
    transaction,
  });

  if (!cart) {
    throw new AppError('Cart not found for the user', 404);
  }

  const existingItem = await CartItem.findOne({
    where: {
      cart_id: cart.cart_id,
      book_id: bookData.book_id,
    },
    transaction,
  });

  if (existingItem) {
    // Update quantity if item exists
    existingItem.quantity += bookData.quantity;
    await existingItem.save({ transaction });
  } else {
    // Create new cart item if it doesn't exist
    const newItem = new CartItem();
    newItem.cart_id = cart.cart_id;
    newItem.book_id = bookData.book_id;
    newItem.quantity = bookData.quantity;
    await newItem.save({ transaction });
  }

  await transaction.commit();
  return await getCart(user_id);
};

export const clearCart = async (user_id: string) => {
  const transaction = await sequelize.transaction();

  const cart = await Cart.findOne({
    where: { user_id },
    transaction,
  });

  if (!cart) {
    throw new AppError('Cart not found for the user', 404);
  }

  // Delete all items from cart
  await CartItem.destroy({
    where: { cart_id: cart.cart_id },
    transaction,
  });

  await transaction.commit();
  return { message: 'Cart cleared successfully' };
};
