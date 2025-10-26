import { Cart, CartItem } from '../../core/model';
import * as cartController from '../../core/controllers/cart.controller';
import { sequelize } from '../../core/database/sequelize';

// Mock Sequelize models
jest.mock('../../core/model/cart', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const CartMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly hasMany = jest.fn();
    static readonly findOne = jest.fn();
  };
  return { __esModule: true, default: CartMock };
});

jest.mock('../../core/model/cartItem', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const CartItemMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly belongsTo = jest.fn();
    static readonly findOne = jest.fn();
    static readonly destroy = jest.fn();
  };
  return { __esModule: true, default: CartItemMock };
});

jest.mock('../../core/model/user', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const UserMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly findOne = jest.fn();
    static readonly hasOne = jest.fn();
    static readonly hasMany = jest.fn();
  };
  return { __esModule: true, default: UserMock };
});

jest.mock('../../core/model/book', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const BookMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly findOne = jest.fn();
  };
  return { __esModule: true, default: BookMock };
});

jest.mock('../../core/model/order', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const OrderMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly hasMany = jest.fn();
    static readonly findOne = jest.fn();
    static readonly findAndCountAll = jest.fn();
    static readonly create = jest.fn();
  };
  return { __esModule: true, default: OrderMock };
});

jest.mock('../../core/model/orderItem', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const OrderItemMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly belongsTo = jest.fn();
    static readonly create = jest.fn();
  };
  return { __esModule: true, default: OrderItemMock };
});

jest.mock('../../core/database/sequelize', () => ({
  sequelize: {
    transaction: jest.fn(),
    define: jest.fn(),
  },
}));

describe('CartController', () => {
  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
    LOCK: { UPDATE: 'UPDATE' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
  });

  describe('getCart', () => {
    it('should return user cart with items', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
        cartItems: [
          {
            id: 1,
            cart_item_id: 'test-item-1',
            book_id: 'test-book-1',
            quantity: 2,
          },
        ],
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);

      const result = await cartController.getCart('test-user-id');

      expect(Cart.findOne).toHaveBeenCalledWith({
        where: { user_id: 'test-user-id' },
        include: ['cartItems'],
      });
      expect(result).toEqual(mockCart);
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
      };

      const mockCartItem = {
        id: 1,
        cart_item_id: 'test-item-1',
        cart_id: 'test-cart-id',
        book_id: 'test-book-1',
        quantity: 1,
        save: jest.fn(),
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);
      (CartItem.findOne as jest.Mock).mockResolvedValue(null);
      (CartItem.findOne as jest.Mock).mockResolvedValue(mockCartItem);

      await cartController.addToCart('test-user-id', {
        book_id: 'test-book-1',
        quantity: 1,
      });

      expect(Cart.findOne).toHaveBeenCalledWith({
        where: { user_id: 'test-user-id' },
        transaction: mockTransaction,
      });
      expect(mockTransaction.commit).toHaveBeenCalled();
    });

    it('should update quantity if item already exists in cart', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
      };

      const mockExistingItem = {
        id: 1,
        cart_item_id: 'test-item-1',
        cart_id: 'test-cart-id',
        book_id: 'test-book-1',
        quantity: 1,
        save: jest.fn(),
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);
      (CartItem.findOne as jest.Mock).mockResolvedValue(mockExistingItem);

      await cartController.addToCart('test-user-id', {
        book_id: 'test-book-1',
        quantity: 2,
      });

      expect(mockExistingItem.quantity).toBe(3);
      expect(mockExistingItem.save).toHaveBeenCalledWith({ transaction: mockTransaction });
      expect(mockTransaction.commit).toHaveBeenCalled();
    });

    it('should throw error if cart not found', async () => {
      (Cart.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        cartController.addToCart('test-user-id', {
          book_id: 'test-book-1',
          quantity: 1,
        })
      ).rejects.toThrow('Cart not found for the user');

      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);
      (CartItem.destroy as jest.Mock).mockResolvedValue(undefined);

      const result = await cartController.clearCart('test-user-id');

      expect(Cart.findOne).toHaveBeenCalledWith({
        where: { user_id: 'test-user-id' },
        transaction: mockTransaction,
      });
      expect(CartItem.destroy).toHaveBeenCalledWith({
        where: { cart_id: 'test-cart-id' },
        transaction: mockTransaction,
      });
      expect(mockTransaction.commit).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Cart cleared successfully' });
    });

    it('should throw error if cart not found', async () => {
      (Cart.findOne as jest.Mock).mockResolvedValue(null);

      await expect(cartController.clearCart('test-user-id')).rejects.toThrow(
        'Cart not found for the user'
      );

      expect(CartItem.destroy).not.toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });
  });
});
