import { IBook } from './IBook';
import { IOrder } from './IOrder';

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated order item ID
 *         order_item_id:
 *           type: string
 *           description: Unique identifier for the order item
 *         order_id:
 *           type: string
 *           description: ID of the order this item belongs to
 *         book_id:
 *           type: string
 *           description: ID of the book in this order item
 *         quantity:
 *           type: number
 *           description: Quantity of books ordered
 *         price:
 *           type: number
 *           description: Price per unit at the time of order
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         order:
 *           $ref: '#/components/schemas/Order'
 *         book:
 *           $ref: '#/components/schemas/Book'
 */
export interface IOrderItem {
  id: number;
  order_item_id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  order?: IOrder;
  book?: IBook;
}

export default IOrderItem;
