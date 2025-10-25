import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticate';
import {
  checkoutHandler,
  getOrderByIdHandler,
  getOrderHistoryHandler,
} from '../requestHandlers/order';

const router = Router();
router.use(authenticateUser);

router.post('/checkout', checkoutHandler);
router.get('/history', getOrderHistoryHandler);
router.get('/:orderId', getOrderByIdHandler);

export default router;
