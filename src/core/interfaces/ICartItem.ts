/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated item ID
 *         item_id:
 *           type: string
 *           description: Unique identifier for the cart item
 *         cart_id:
 *           type: string
 *           description: ID of the cart this item belongs to
 *         book_id:
 *           type: string
 *           description: ID of the book in this cart item
 *         quantity:
 *           type: number
 *           description: Quantity of books in this cart item
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     AddToCartRequest:
 *       type: object
 *       required:
 *         - book_id
 *         - quantity
 *       properties:
 *         book_id:
 *           type: string
 *           description: ID of the book to add to cart
 *         quantity:
 *           type: number
 *           description: Quantity to add
 *           minimum: 1
 */
export interface ICartItem {
  id: number;
  item_id: string;
  cart_id: string;
  book_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export type CartItemCreationType = Pick<ICartItem, 'cart_id' | 'book_id' | 'quantity'>;
export default ICartItem;
