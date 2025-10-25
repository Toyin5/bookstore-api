import { checkout, getOrderById, getOrderHistory } from '../../core/controllers/order.controller';
import { AppResponse } from '../../core/utils/appResponse';
import { wrapAsync } from '../middlewares/wrapAsync';

export const checkoutHandler = wrapAsync(async (req, res) => {
  const user = res.locals.user.user;
  const order = await checkout(user.user);
  AppResponse(res, { order }, 'Order created successfully', 201);
});

export const getOrderHistoryHandler = wrapAsync(async (req, res) => {
  const page = Number.parseInt(req.query.page as string) || 1;
  const limit = Number.parseInt(req.query.limit as string) || 10;
  const user = res.locals.user.user;
  const orders = await getOrderHistory(user.user, page, limit);
  AppResponse(res, { orders }, 'Orders fetched successfully', 200);
});

export const getOrderByIdHandler = wrapAsync(async (req, res) => {
  const order = await getOrderById(req.params.orderId);
  AppResponse(res, { order }, 'Order fetched successfully', 200);
});
