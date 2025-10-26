import { Order, OrderItem, Cart, CartItem, Book } from '../../core/model';
import * as orderController from '../../core/controllers/order.controller';
import { sequelize } from '../../core/database/sequelize';

// Mock Sequelize models
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
    static readonly findAll = jest.fn();
    static readonly destroy = jest.fn();
  };
  return { __esModule: true, default: CartItemMock };
});

jest.mock('../../core/model/book', () => {
  const SequelizeMock = jest.requireActual('sequelize');
  const BookMock = class extends SequelizeMock.Model {
    static readonly init = jest.fn();
    static readonly findOne = jest.fn();
    static readonly decrement = jest.fn();
  };
  return { __esModule: true, default: BookMock };
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

jest.mock('../../core/database/sequelize', () => ({
  sequelize: {
    transaction: jest.fn(),
    define: jest.fn(),
  },
}));

describe('OrderController', () => {
  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
    LOCK: { UPDATE: 'UPDATE' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
  });

  describe('checkout', () => {
    it('should successfully create an order from cart', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
      };

      const mockBook = {
        id: 1,
        uuid: 'test-book-1',
        title: 'Test Book',
        price: 10.99,
        stock: 5,
      };

      const mockCartItems = [
        {
          id: 1,
          cart_item_id: 'test-item-1',
          cart_id: 'test-cart-id',
          book_id: 'test-book-1',
          quantity: 2,
          book: mockBook,
        },
      ];

      const mockOrder = {
        id: 1,
        order_id: 'test-order-1',
        user_id: 'test-user-id',
        total_amount: 21.98,
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);
      (CartItem.findAll as jest.Mock).mockResolvedValue(mockCartItems);
      (Book.findOne as jest.Mock).mockResolvedValue(mockBook);
      (Order.create as jest.Mock).mockResolvedValue(mockOrder);
      (Book.decrement as jest.Mock).mockResolvedValue([1]);
      (OrderItem.create as jest.Mock).mockResolvedValue({});
      (CartItem.destroy as jest.Mock).mockResolvedValue(undefined);

      // Mock getOrderById which is called at the end
      (Order.findOne as jest.Mock).mockResolvedValue({
        ...mockOrder,
        orderItems: [
          {
            id: 1,
            order_item_id: 'test-order-item-1',
            book_id: 'test-book-1',
            quantity: 2,
            price: 10.99,
            book: mockBook,
          },
        ],
      });

      const result = await orderController.checkout('test-user-id');

      expect(Cart.findOne).toHaveBeenCalled();
      expect(CartItem.findAll).toHaveBeenCalled();
      expect(Book.findOne).toHaveBeenCalled();
      expect(Order.create).toHaveBeenCalled();
      expect(OrderItem.create).toHaveBeenCalled();
      expect(Book.decrement).toHaveBeenCalled();
      expect(CartItem.destroy).toHaveBeenCalled();
      expect(mockTransaction.commit).toHaveBeenCalled();
      expect(result.order_id).toBe('test-order-1');
    });

    it('should throw error if cart is empty', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);
      (CartItem.findAll as jest.Mock).mockResolvedValue([]);

      await expect(orderController.checkout('test-user-id')).rejects.toThrow('Cart is empty');

      expect(Order.create).not.toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });

    it('should throw error if insufficient stock', async () => {
      const mockCart = {
        id: 1,
        cart_id: 'test-cart-id',
        user_id: 'test-user-id',
      };

      const mockBook = {
        id: 1,
        uuid: 'test-book-1',
        title: 'Test Book',
        price: 10.99,
        stock: 1,
      };

      const mockCartItems = [
        {
          id: 1,
          cart_item_id: 'test-item-1',
          cart_id: 'test-cart-id',
          book_id: 'test-book-1',
          quantity: 2,
          book: mockBook,
        },
      ];

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);
      (CartItem.findAll as jest.Mock).mockResolvedValue(mockCartItems);
      (Book.findOne as jest.Mock).mockResolvedValue(mockBook);

      await expect(orderController.checkout('test-user-id')).rejects.toThrow(
        'Insufficient stock for book: Test Book'
      );

      expect(Order.create).not.toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });
  });

  describe('getOrderHistory', () => {
    it('should return paginated order history', async () => {
      const mockOrders = {
        count: 2,
        rows: [
          {
            id: 1,
            order_id: 'test-order-1',
            user_id: 'test-user-id',
            total_amount: 21.98,
            orderItems: [
              {
                order_item_id: 'test-item-1',
                book: {
                  uuid: 'test-book-1',
                  title: 'Test Book',
                  author: 'Test Author',
                },
              },
            ],
          },
          {
            id: 2,
            order_id: 'test-order-2',
            user_id: 'test-user-id',
            total_amount: 15.99,
            orderItems: [],
          },
        ],
      };

      (Order.findAndCountAll as jest.Mock).mockResolvedValue(mockOrders);

      const result = await orderController.getOrderHistory('test-user-id');

      expect(Order.findAndCountAll).toHaveBeenCalledWith({
        where: { user_id: 'test-user-id' },
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
        offset: 0,
        limit: 10,
      });

      expect(result).toEqual(mockOrders);
    });
  });

  describe('getOrderById', () => {
    it('should return order details', async () => {
      const mockOrder = {
        id: 1,
        order_id: 'test-order-1',
        user_id: 'test-user-id',
        total_amount: 21.98,
        orderItems: [
          {
            id: 1,
            order_item_id: 'test-item-1',
            book: {
              uuid: 'test-book-1',
              title: 'Test Book',
              author: 'Test Author',
              price: 10.99,
            },
          },
        ],
      };

      (Order.findOne as jest.Mock).mockResolvedValue(mockOrder);

      const result = await orderController.getOrderById('test-order-1');

      expect(Order.findOne).toHaveBeenCalledWith({
        where: { order_id: 'test-order-1' },
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

      expect(result).toEqual(mockOrder);
    });

    it('should throw error if order not found', async () => {
      (Order.findOne as jest.Mock).mockResolvedValue(null);

      await expect(orderController.getOrderById('non-existent-order')).rejects.toThrow(
        'Order not found'
      );
    });
  });
});
