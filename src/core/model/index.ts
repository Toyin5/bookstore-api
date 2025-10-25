import Cart from './cart';
import CartItem from './cartItem';
import User from './user';
import Book from './book';
import Order from './order';
import OrderItem from './orderItem';

// Setup associations
Cart.hasMany(CartItem, {
  sourceKey: 'cart_id',
  foreignKey: 'cart_id',
  as: 'cartItems',
});

CartItem.belongsTo(Cart, {
  foreignKey: 'cart_id',
  targetKey: 'cart_id',
});

CartItem.belongsTo(Book, {
  foreignKey: 'book_id',
  targetKey: 'uuid',
  as: 'book',
});

// Order associations
User.hasMany(Order, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
  as: 'orders',
});

Order.hasMany(OrderItem, {
  sourceKey: 'order_id',
  foreignKey: 'order_id',
  as: 'orderItems',
});

OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  targetKey: 'order_id',
  as: 'order',
});

OrderItem.belongsTo(Book, {
  foreignKey: 'book_id',
  targetKey: 'uuid',
  as: 'book',
});

// Export all models
export { default as User } from './user';
export { default as Cart } from './cart';
export { default as CartItem } from './cartItem';
export { default as Book } from './book';
export { default as Order } from './order';
export { default as OrderItem } from './orderItem';
