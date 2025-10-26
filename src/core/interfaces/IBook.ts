/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         uuid:
 *           type: string
 *           description: Unique identifier for the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         isbn:
 *           type: string
 *           description: ISBN number of the book
 *         description:
 *           type: string
 *           description: Brief description of the book
 *         genre:
 *           type: string
 *           description: Book genre
 *         price:
 *           type: number
 *           description: Price of the book
 *         stock:
 *           type: number
 *           description: Available quantity in stock
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */
export interface IBook {
  id: number;
  uuid: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  genre: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export type BookCreationType = Pick<
  IBook,
  'title' | 'author' | 'isbn' | 'description' | 'price' | 'stock'
>;
export default IBook;
