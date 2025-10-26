/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated user ID
 *         user_id:
 *           type: string
 *           description: Unique identifier for the user
 *         first_name:
 *           type: string
 *           description: User's first name
 *         last_name:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */
export interface IUser {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
}
export type UserCreationType = Pick<IUser, 'first_name' | 'last_name' | 'email' | 'password'>;
export default IUser;
