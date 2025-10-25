import { Router } from 'express';
import { addToCartHandler, clearCartHandler, getCartHandler } from '../requestHandlers/cart';
import { authenticateUser } from '../middlewares/authenticate';

const cartRouter = Router();

// Apply authentication middleware to all cart routes
cartRouter.use(authenticateUser);

cartRouter.get('/', getCartHandler);
cartRouter.post('/add', addToCartHandler);
cartRouter.delete('/clear', clearCartHandler);

export default cartRouter;
