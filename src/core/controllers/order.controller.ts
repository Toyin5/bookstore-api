import { sequelize } from '../database/sequelize';
import { Order, OrderItem, Cart, CartItem, Book } from '../model';
import AppError from '../utils/appError';

interface CartItemWithBook extends CartItem {
  book: Book;
}

export const checkout = async (user_id: string) => {
  const transaction = await sequelize.transaction();

  const cart = await Cart.findOne({
    where: { user_id },
    transaction,
  });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  const cartItems = (await CartItem.findAll({
    where: { cart_id: cart.cart_id },
    include: [
      {
        model: Book,
        as: 'book',
      },
    ],
    transaction,
  })) as CartItemWithBook[];

  if (cartItems.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  // Check stock availability for all items
  for (const item of cartItems) {
    const book = await Book.findOne({
      where: { uuid: item.book_id },
      lock: { level: transaction.LOCK.UPDATE, of: Book },
      transaction,
    });

    if (!book) {
      throw new AppError(`Book not found: ${item.book_id}`, 404);
    }

    if (book.stock < item.quantity) {
      throw new AppError(`Insufficient stock for book: ${book.title}`, 400);
    }
  }

  // Calculate total amount
  const total_amount = cartItems.reduce((sum: number, item: CartItemWithBook) => {
    return sum + (item.book?.price || 0) * item.quantity;
  }, 0);

  const now = new Date();

  // Create order
  const order = await Order.create(
    {
      user_id,
      total_amount,
      created_at: now,
      updated_at: now,
    },
    { transaction }
  );

  // Create order items and update book stock
  for (const item of cartItems) {
    const now = new Date();
    await OrderItem.create(
      {
        order_id: order.order_id,
        book_id: item.book_id,
        quantity: item.quantity,
        price: item.book.price,
        created_at: now,
        updated_at: now,
      },
      { transaction }
    );

    // Update book stock
    await Book.decrement(
      {
        stock: item.quantity,
      },
      {
        where: { uuid: item.book_id },
        transaction,
      }
    );
  }

  // Clear the cart
  await CartItem.destroy({
    where: { cart_id: cart.cart_id },
    transaction,
  });

  await transaction.commit();

  return await getOrderById(order.order_id);
};

export const getOrderHistory = async (user_id: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const orders = await Order.findAndCountAll({
    where: { user_id },
    include: [
      {
        model: OrderItem,
        as: 'orderItems',
        include: [
          {
            model: Book,
            as: 'book',
            attributes: ['uuid', 'title', 'author'],
          },
        ],
      },
    ],
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });

  return orders;
};

export const getOrderById = async (order_id: string) => {
  const order = await Order.findOne({
    where: { order_id },
    include: [
      {
        model: OrderItem,
        as: 'orderItems',
        include: [
          {
            model: Book,
            as: 'book',
            attributes: ['uuid', 'title', 'author', 'price'],
          },
        ],
      },
    ],
  });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  return order;
};
