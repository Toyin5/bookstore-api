/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated cart ID
 *         cart_id:
 *           type: string
 *           description: Unique identifier for the cart
 *         user_id:
 *           type: string
 *           description: ID of the user who owns this cart
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */
export interface ICart {
  id: number;
  cart_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
export default ICart;
