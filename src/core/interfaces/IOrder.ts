import { IUser } from './IUser';
import { IOrderItem } from './IOrderItem';

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated order ID
 *         order_id:
 *           type: string
 *           description: Unique identifier for the order
 *         user_id:
 *           type: string
 *           description: ID of the user who placed this order
 *         total_amount:
 *           type: number
 *           description: Total amount of the order
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         user:
 *           $ref: '#/components/schemas/User'
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 */
export interface IOrder {
  id: number;
  order_id: string;
  user_id: string;
  total_amount: number;
  created_at: Date;
  updated_at: Date;
  user?: IUser;
  orderItems?: IOrderItem[];
}

export default IOrder;
