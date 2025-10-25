import Cart from './cart';
import CartItem from './cartItem';
import User from './user';
import Book from './book';

// Setup associations
Cart.hasMany(CartItem, {
    sourceKey: 'cart_id',
    foreignKey: 'cart_id',
    as: 'cartItems'
});

CartItem.belongsTo(Cart, {
    foreignKey: 'cart_id',
    targetKey: 'cart_id'
});

CartItem.belongsTo(Book, {
    foreignKey: 'book_id',
    targetKey: 'uuid',
    as: 'book'
});

// Export all models
export { default as User } from './user';
export { default as Cart } from './cart';
export { default as CartItem } from './cartItem';
export { default as Book } from './book';