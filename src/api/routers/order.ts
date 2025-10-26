import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticate';
import {
  checkoutHandler,
  getOrderByIdHandler,
  getOrderHistoryHandler,
} from '../requestHandlers/order';

const router = Router();
router.use(authenticateUser);

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Create a new order from cart items
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cart is empty or insufficient stock
 *       401:
 *         description: Unauthorized - User not logged in
 */
router.post('/checkout', checkoutHandler);

/**
 * @swagger
 * /api/orders/history:
 *   get:
 *     summary: Get user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - User not logged in
 */
router.get('/history', getOrderHistoryHandler);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details with items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - User not logged in
 *       404:
 *         description: Order not found
 */
router.get('/:orderId', getOrderByIdHandler);

export default router;
